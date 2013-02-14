/**
 * Controlador do módulo teste.
 * 
 * @class   App.controller.bundle.setting.teste.TesteController
 * @extends Ext.app.Controller
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.controller.bundle.setting.teste.TesteController',{
    extend: 'Ext.app.Controller',
   
    // visões utilizadas
    views: [
        'bundle.setting.teste.TesteModule'
    ],
    
    // data stores utilizados
    stores: [
        'framework.AclStore'
    ],
    
    // referências
    refs: [
        {selector: 'testemodule', ref: 'module'},
        {selector: 'testegrid', ref: 'grid'},
        {selector: 'testegridtoolbar', ref: 'gridToolbar'},
        {selector: 'testegridtoolbar searchfield', ref: 'searchField'},
        {selector: 'testeformtoolbar', ref: 'formToolbar'},
        {selector: 'testeform', ref: 'form'}
    ],
    
    card: 'list',
    remoteController: Actions.Bundle,
    
    init : function(){
        this.control({
            // quando o módulo é ativado
            'testemodule': {
                activate: function(){
                    this.application.setActiveModule(this);
                },
                
                render: function(){
                    this.application.setActiveModule(this);
                }
            },
            
            // grid
            'testegrid': {
                render: this.onGridRender,
                itemclick: this.onGridItemClick
            },

            // botão novo da toolbar da lista de módulos
            'testegridtoolbar #btnNew' : {
                click: this.onNewClick
            },
            
            // botão delete da toolbar da lista de módulos
            'testegridtoolbar #btnDelete' : {
                click: this.onDeleteClick
            },                        
            
            // formulário de edição
            'testeform field' : {
                change: function(){
                    this.isDirty = true;
                }
            },
            
            // botão voltar da toolbar do formulário
            'testeformtoolbar #btnBack' : {
                click: this.onBackClick
            },

            // botão salvar da toolbar do formulário
            'testeformtoolbar #btnSave' : {
                click: this.onSaveClick
            }                        
        })
    },
    
    /**
     * Coloca o foco no primeiro campo do formulário.
     */
    setFocusOnFirst : function(){
        var me = this,
        	fields = me.getForm().getForm().getFields();
        	
        // coloca o foco no segundo campo, pois o primeiro é o hidden id
        fields.items[1].focus(false, 100);
    },
    
    /**
     * Acionado quando o botão Novo é clicado.
     * 
     * @param {Ext.button.Button} btn
     */
    onNewClick : function(btn){
        var me = this,
            tb = me.getFormToolbar();
        
        tb.down('#ckKeepOpened').setValue(true).show();                    
        this.activateForm();
        this.isDirty = false;
        me.setFocusOnFirst();
        
        tb.down('#formTitle').update('<b>Novo</b>');
    },
    
    /**
     * Acionado quando o botão save é pressionado no formulário.
     * 
     * @param {Ext.button.Button} btn
     */
    onSaveClick : function(btn){
        var me = this,
            form = me.getForm();
        
        
        if (form.getForm().isValid()){
            btn.setLoading({msg: '...'});
            
            me.remoteController.save(form.getForm().getValues(), this.onAfterSave, this);
        } else {
            Neton.Msg.flash({
                type: 'error',
                msg: 'Por favor, reveja o preenchimento dos campos destacados!',
                callback: function(){
                    me.setFocusOnFirst();                    
                }
            });            
        }        
    },
    
    /**
     * Chamada de retorno executada após o salvamento do registro.
     * 
     * @param {Boolean} result
     */
    onAfterSave : function(result){
        var me = this,
            tb = me.getFormToolbar();
        
        tb.down('#btnSave').setLoading(false);
        
        if (result){
            
            Neton.Msg.flash({
                type: 'success',
                width: 250,
                autoHideSleep: 1,
                callback: function(){
                    me.setFocusOnFirst();
                },
                msg: 'Registro salvo com sucesso!'
            })
            
            me.getForm().getForm().reset();            
            me.reloadGrid();
            
            if (!tb.down('#ckKeepOpened').getValue()){
                me.activateGrid();
            }
            
        } else {
            Neton.Msg.flash({
                type: 'error',
                msg: 'Ocorreu um erro ao salvar o registro!'
            });
        }
    },
    
    /**
     * Acionado quando o botão Voltar é clicado.
     * 
     * @param {Ext.button.Button} btn
     */
    onBackClick : function(btn){
        var me = this,
            form = me.getForm(),
            tb = me.getFormToolbar();
                    
        if (!this.isDirty){
            this.activateGrid();
            form.getForm().reset();            
        } else {
            Ext.Msg.confirm('Atenção','Deseja realmente cancelar este cadastro, todos os dados não salvos serão perdidos!',
                function(btn){
                    if ('yes' == btn){                        
                        form.getForm().reset();                                    
                        me.activateGrid();
                    }
                }
            );
        }
    },    
    
    /**
     * Registra eventos para o grid.
     * 
     * @param {Ext.grid.Panel} grid
     */
    onGridRender : function(grid){
    	var me = this;
		
		// define os renderizadores das colunas do grid		    	        
    	me.defineColumnRenderers(grid);
    	
    	// define o datastore do campo básico de consulta
        me.getSearchField().setStore(grid.store);
                
        // registra evento para o carregamento do grid
        grid.getStore().on('load', function(){
            this.changeGridToolbarState();
        },this)
        
        // registra evento para a alteração da quantidade de registros selecionados no grid
        grid.on('selectionchange', this.changeGridToolbarState, this);
        
        // força o carregamento do grid
        grid.store.load();
    },
    
    /**
     * Define os renderizadores das colunas do grid.
     * 
     * @param {Ext.grid.Panel} grid
     */
    defineColumnRenderers : function(grid){
        //grid.down('[dataIndex="enabled"]').renderer = this.renderEnabled;
    },
    
    /**
     * Acionado quando um item do grid é clicado. Chama método de 
     * edição de registro.
     * 
     * @param {Ext.grid.Panel} grid
     * @param {Ext.data.Model} rec
     * @param {HTML} item
     * @param {integer} index
     * @param {Ext.event} evt
     */
    onGridItemClick : function(grid, rec, item, index, evt){
        var me = this,
            tb = me.getFormToolbar();
        
        if (evt.target.innerHTML != '&nbsp;'){
            tb.down('#ckKeepOpened').setValue(false).hide();
            
            me.activateForm();
            me.getForm().getForm().loadRecord(rec);
            this.isDirty = false;
            me.setFocusOnFirst();
	        tb.down('#formTitle').update('<b>Editando</b>');
            

        }
    },
    
    /**
     * Ativa o formulário de edição.
     */
    activateForm : function(){
        this.card = 'form';
        this.getModule().getLayout().setActiveItem('formpanel');
    },
    
    /**
     * Ativa o grid de dados.
     */
    activateGrid : function(){
        this.card = 'list';
        this.getModule().getLayout().setActiveItem('gridpanel');
    },    
    
    /**
     * Muda o estado dos botões da toolbar do grid.
     */
    changeGridToolbarState : function(){
        var show = false,
            me = this,
            selected = this.getSelectionIds(),
            tb = this.getGridToolbar(),
            withZero = tb.query('button[showWith="0"]'),
            withOne = tb.query('button[showWith="1"]'),
            withMore = tb.query('button[showWith="1+"]');
            
        if (selected.length == 0){
            me.changeButtonVisibility(withZero, true);
            me.changeButtonVisibility(withOne, false);
            me.changeButtonVisibility(withMore, false);
        }
        
        if (selected.length == 1){
            me.changeButtonVisibility(withZero, false);
            me.changeButtonVisibility(withOne, true);
            me.changeButtonVisibility(withMore, true);            
        }
        
        if (selected.length >= 2){
            me.changeButtonVisibility(withZero, false);
            me.changeButtonVisibility(withOne, false);
            me.changeButtonVisibility(withMore, true);            
        }        
        
    },
    
    /**
     * Altera a visibilidade dos botões.
     * 
     * @param {Array} buttons
     * @param {Boolean} state
     */
    changeButtonVisibility : function(buttons, state){
        
        // altera o etado de cada botão
        Ext.each(buttons, function(btn){
            btn.setVisible(state);
        });
    },
    
    /**
     * Deleta os modules seleciondados.
     * 
     * @param {Ext.button.Button} btn
     */
    onDeleteClick : function(){
        var me = this,
        	ids = this.getSelectionIds();
        
        me.remoteController.remove({modules: ids}, function(result){
            if (result){
                this.reloadGrid();
            } else {
                Neton.Msg.flash({
                    type: 'error',
                    msg: 'Não foi possível excluir os registros, verifique se existem relacionamentos vinculados a eles!',
                    autoHideSleep: 4
                })
            }
        }, this);
    },    
    
    /**
     * Recarrega o grid.
     */
    reloadGrid : function(){
        // pega a toolbar do grid
        this.getGrid().dockedItems.items[1].doRefresh();        
    },
    
    /**
     * Retorna os ids dos registros selecionados no grid.
     * 
     * @return {Array}
     */
    getSelectionIds : function(){
        var grid = this.getGrid(),
            selection = grid.getSelectionModel().getSelection(),
            ids = [];
        
        Ext.each(selection, function(rec){
            ids.push(rec.get('id'));
        });
        
        return ids;        
    },
        
    /**
     * Acionado ao pressionar a tecla ESC.
     */
    onEscPress : function(){
        var me = this,
            tb = me.getFormToolbar();
        
        if (me.card == 'form'){
            me.onBackClick(tb.down('#btnBack'));
        }        
    },
    
    /**
     * Acionado ao pressionar Ctrl + S.
     */
    onSavePress : function(){
        var me = this,
            tb = me.getFormToolbar();

        if (me.card == 'form'){
            me.onSaveClick(tb.down('#btnSave'));
        }       
    },
    
    /**
     * Acionado ao pressionar Ctrl + C
     */
    onNewPress : function(){
        var me = this,
            tb = me.getGridToolbar();

        if (me.card == 'list'){
            me.onNewClick(tb.down('#btnNew'));
        }               
    }
        
})

