/**
 * Controlador do módulo de módulos da aplicação.
 * 
 * @class   App.controller.bundle.framework.module.ModuleController
 * @extends Ext.app.Controller
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.controller.bundle.framework.module.ModuleController',{
    extend: 'Ext.app.Controller',
   
    // visões utilizadas
    views: [
        'bundle.framework.module.ModuleModule'
    ],
    
    // data stores utilizados
    stores: [
        'framework.ModuleStore'
    ],
    
    // referências
    refs: [
        {selector: 'modulemodule', ref: 'module'},
        {selector: 'modulegrid', ref: 'grid'},
        {selector: 'modulegridtoolbar', ref: 'gridToolbar'},
        {selector: 'moduleformtoolbar', ref: 'formToolbar'},
        {selector: 'moduleform', ref: 'form'}
    ],
    
    card: 'list',
    
    init : function(){
        this.control({
            // quando o module é ativado
            'modulemodule': {
                activate: function(){
                    this.application.setActiveModule(this);
                },
                
                render: function(){
                    this.application.setActiveModule(this);
                }
            },
            
            // module grid
            'modulegrid': {
                render: this.onGridRender,
                itemclick: this.onGridItemClick
            },
            
            // botão enable da toolbar da lista de módulos
            'modulegridtoolbar #btnEnable' : {
                click: this.onEnableClick
            },
            
            // botão disable da toolbar da lista de módulos
            'modulegridtoolbar #btnDisable' : {
                click: this.onDisableClick
            },
            
            // botão delete da toolbar da lista de módulos
            'modulegridtoolbar #btnDelete' : {
                click: this.onDeleteClick
            },            
            
            // botão novo da toolbar da lista de módulos
            'modulegridtoolbar #btnNew' : {
                click: this.onNewClick
            },
            
            // formulário de edição de módulos
            'moduleform field' : {
                change: function(){
                    this.isDirty = true;
                }
            },
            
            // botão voltar da toolbar do formulário de módulos
            'moduleformtoolbar #btnBack' : {
                click: this.onBackClick
            },

            // botão salvar da toolbar do formulário de módulos
            'moduleformtoolbar #btnSave' : {
                click: this.onSaveClick
            }
            
            
        })
    },
    
    /**
     * Coloca o foco no primeiro campo do formulário.
     */
    setFocusOnFirst : function(){
        var me = this;
        
        me.getForm().down('textfield').focus(250);
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
    },
    
    /**
     * Acionado quando o botão save é pressionado no formulário de módulos.
     * 
     * @param {Ext.button.Button} btn
     */
    onSaveClick : function(btn){
        var me = this,
            form = me.getForm();
        
        
        if (form.getForm().isValid()){
            btn.setLoading({msg: '...'});
            
            Actions.NetonFramework_Module.save(form.getForm().getValues(), this.onAfterSave, this);
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
                msg: 'Módulo salvo com sucesso!'
            })
            
            me.getForm().getForm().reset();            
            me.reloadGrid();
            
            if (!tb.down('#ckKeepOpened').getValue()){
                me.activateGrid();
            }
            
        } else {
            Neton.Msg.flash({
                type: 'error',
                msg: 'Ocorreu um erro ao salvar o módulo!'
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
        grid.down('[dataIndex="enabled"]').renderer = this.renderEnabled;
        grid.down('[dataIndex="isDefault"]').renderer = this.renderIsDefault;
        grid.down('[dataIndex="separator"]').renderer = this.renderIsDefault;
        
        grid.getView().on('drop', this.reorderModule, this);
        grid.getStore().on('load', function(){
            this.changeGridToolbarState();
        },this)
        grid.on('selectionchange', this.changeGridToolbarState, this);
    },
    
    /**
     * Acionado quando um item do grid de módulos é clicado. Chama método de 
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
     * Reordena os módulos.
     */
    reorderModules : function(target, dd, rec){
        var store = this.getGrid().getStore(),
            items = [], i = 1;
                
        store.each(function(rec){
            items.push({
                order: i,
                id: rec.get('id')
            });
            i++;
        });

        // chama o método remoto para reordenar os módulos
        Actions.NetonFramework_Module.reorder(items, Ext.emptyFn);
        
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
     * Habilita os módulos selecionados.
     * 
     * @param {Ext.button.Button} btn
     */
    onEnableClick : function(){
        var ids = this.getSelectionIds();
        
        Actions.NetonFramework_Module.setEnabled({ids: ids, enabled: '1'}, this.reloadGrid, this);
    },
    
    /**
     * Deleta os modules seleciondados.
     * 
     * @param {Ext.button.Button} btn
     */
    onDeleteClick : function(){
        var ids = this.getSelectionIds();
        
        Actions.NetonFramework_Module.remove({modules: ids}, function(result){
            if (result){
                this.reloadGrid();
            } else {
                Neton.Msg.flash({
                    type: 'error',
                    msg: 'Não foi possível excluir as aplicações, verifique se existem módulos vinculados a elas!',
                    autoHideSleep: 4
                })
            }
        }, this);
    },    
    
    /**
     * Desabilita os modulos selecionados.
     * 
     * @param {Ext.button.Button} btn
     */
    onDisableClick : function(){
        var ids = this.getSelectionIds();
        
        Actions.NetonFramework_Module.setEnabled({ids: ids, enabled: '0'}, this.reloadGrid, this);
    },    
    
    /**
     * Recarrega o grid de modulos.
     */
    reloadGrid : function(){
        // pega a toolbar do grid
        this.getGrid().dockedItems.items[1].doRefresh();        
    },
    
    /**
     * Renderiza a coluna Enabled
     * 
     * @param {Boolean} value
     */
    renderEnabled : function(value){
        if (value == true){
            return 'Sim';
        } else {
            return 'Não';
        }
    },
    
    /**
     * Renderiza a coluna IsDefault
     * 
     * @param {Boolean} value
     */
    renderIsDefault : function(value){
        if (value == true){
            return 'Sim';
        } else {
            return 'Não';
        }
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
     * Acionado ao pressionar Ctrl + N
     */
    onNewPress : function(){
        var me = this,
            tb = me.getGridToolbar();

        if (me.card == 'list'){
            me.onNewClick(tb.down('#btnNew'));
        }               
    }
    
    
})

