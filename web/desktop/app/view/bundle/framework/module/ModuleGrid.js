/**
 * Grid do módulo de bundles.
 * 
 * @class   App.view.bundle.framework.module.ModuleGrid
 * @extends Ext.grid.Panel
 * @alias   modulegrid
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.module.ModuleGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.modulegrid',
    
    /**
     * Inicializa a toolbar
     */
    initComponent : function(){
        var me = this,
            sm = Ext.create('Ext.selection.CheckboxModel',{
                checkOnly: true,
                allowDeselect: true,
                mode: 'SIMPLE'
            });
            //store = new App.store.framework.ModuleStore();            
        
        Ext.applyIf(me,{
            //store: store,
            cls: 'neton-grid',
            selModel: sm,
            viewConfig: {
               plugins: [{
                   ptype: 'gridviewdragdrop',
                   dragText: 'Reordenar'
               }]                      
            },
            features: [{
                    ftype:'grouping',
                    groupHeaderTpl: '{name}'
            }, {
					ftype: 'filters',
                   	encode: 'json'               	
            }],
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
                    header: 'Usa separador',
                    flex: 1,
                    dataIndex: 'spacer',
                    filter: {
                    	type: 'boolean'
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
                //store: store,
                dock: 'bottom',
                displayInfo: true
            }]
        });
        
        me.callParent(arguments);
    }
});

