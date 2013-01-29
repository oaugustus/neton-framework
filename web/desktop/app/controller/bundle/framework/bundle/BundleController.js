/**
 * Controlador do módulo de bundles da aplicação.
 * 
 * @class   App.controller.bundle.framework.bundle.BundleController
 * @extends Ext.app.Controller
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.controller.bundle.framework.bundle.BundleController',{
    extend: 'Ext.app.Controller',
   
    // visões utilizadas
    views: [
        'bundle.framework.bundle.BundleModule'
    ],
    
    // data stores utilizados
    stores: [
        'framework.BundleStore'
    ],
    
    // referências
    refs: [
        {selector: 'bundlegrid', ref: 'bundleGrid'},
        {selector: 'bundletoolbar', ref: 'bundleToolbar'}
    ],
    
    init : function(){
        this.control({
            'bundlegrid': {
                render: this.onGridRender
            },
            
            'bundletoolbar #btnEnable' : {
                click: this.enableBundles
            },
            
            'bundletoolbar #btnDisable' : {
                click: this.disableBundles
            }
            
        })
    },
    
    /**
     * Registra eventos para o grid.
     * 
     * @param {Ext.grid.Panel} grid
     */
    onGridRender : function(grid){
        grid.down('[dataIndex="enabled"]').renderer = this.renderEnabled;
        grid.down('[dataIndex="isDefault"]').renderer = this.renderIsDefault;
        grid.getView().on('drop', this.reorderBundles, this);
        grid.on('selectionchange', this.changeGridToolbarState, this);
    },
    
    /**
     * Reordena os bundles.
     */
    reorderBundles : function(){
        var store = this.getBundleGrid().getStore(),
            items = [], i = 1;
        
        store.each(function(rec){
            items.push({
                order: i,
                id: rec.get('id')
            });
            i++;
        });
        
        Actions.NetonFramework_Bundle.reorder(items, Ext.emptyFn);
    },
    
    /**
     * Muda o estado dos botões da toolbar do grid.
     * 
     * @param {Ext.selection.SelectionModel} model
     * @param {Array} selected
     */
    changeGridToolbarState : function(model, selected){
        var show = false,
            tb = this.getBundleToolbar();
        
        if (selected.length > 0){
            show = true;
        }
        
        // mostra ou esconde os botões adicionais da toolbar
        tb.down('#btnEnable').setVisible(show);
        tb.down('#btnDisable').setVisible(show);
    },
    
    /**
     * Habilita os bundles selecionados.
     * 
     * @param {Ext.button.Button} btn
     */
    enableBundles : function(){
        var ids = this.getSelectionIds();
        
        Actions.NetonFramework_Bundle.setEnabled({ids: ids, enabled: '1'}, this.reloadGrid, this);
    },
    
    /**
     * Desabilita os bundles selecionados.
     * 
     * @param {Ext.button.Button} btn
     */
    disableBundles : function(){
        var ids = this.getSelectionIds();
        
        Actions.NetonFramework_Bundle.setEnabled({ids: ids, enabled: '0'}, this.reloadGrid, this);
    },    
    
    /**
     * Recarrega o grid de bundles.
     */
    reloadGrid : function(){
        // pega a toolbar do grid
        this.getBundleGrid().dockedItems.items[1].doRefresh();
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
        var grid = this.getBundleGrid(),
            selection = grid.getSelectionModel().getSelection(),
            ids = [];
        
        Ext.each(selection, function(rec){
            ids.push(rec.get('id'));
        });
        
        return ids;        
    }
    
})

