/**
 * Grid do módulo de bundles.
 * 
 * @class   App.view.bundle.framework.bundle.BundleGrid
 * @extends Ext.grid.Panel
 * @alias   bundlegrid
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.bundlegrid',
    
    /**
     * Inicializa a toolbar
     */
    initComponent : function(){
        var me = this,
            sm = Ext.create('Ext.selection.CheckboxModel',{
                checkOnly: true,
                allowDeselect: true,
                mode: 'SIMPLE'
            }),
            store = new App.store.framework.BundleStore();
            store.load();
        
        Ext.applyIf(me,{
            store: store,
            cls: 'neton-grid',
            selModel: sm,
            features: [
               {
                   ftype: 'filters',
                   encode: 'json'                    
               }  
            ],
            viewConfig: {
               plugins: [{
                   ptype: 'gridviewdragdrop',
                   dragText: 'Reordenar'
               }]                      
            },
            columns: [
                {
                    header: 'Nome',
                    flex: 2,
                    itemId: 'colTitle',
                    dataIndex: 'title',
                    filter: {
                        type: 'string'
                    }                    
                },                
                {
                    header: 'Classe',
                    flex: 2,
                    dataIndex: 'name',
                    filter: {
                        type: 'string'
                    }                                        
                },
                {
                    header: 'Ícone',
                    flex: 1,
                    dataIndex: 'iconCls',
                    filter: {
                        type: 'string'
                    }                                        
                },
                {
                    header: 'Habilitado',
                    flex: 1,
                    dataIndex: 'enabled',
                    filter: {
                        type: 'boolean'
                    }                                        
                },
                {
                    header: 'Default',
                    flex: 1,
                    dataIndex: 'isDefault',
                    filter: {
                        type: 'boolean'
                    }                                                            
                }                                
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store,   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }]
        });
        
        me.callParent(arguments);
    }
});

