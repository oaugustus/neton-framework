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
            }),
            store = new App.store.framework.ModuleStore();
            store.load();
        
        Ext.applyIf(me,{
            store: store,
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
            }],
            columns: [
                {
                    header: 'Nome',
                    flex: 2,
                    itemId: 'colTitle',
                    dataIndex: 'title'
                },                
                {
                    header: 'Classe',
                    flex: 2,
                    dataIndex: 'name'
                },
                {
                    header: 'Ícone',
                    flex: 1,
                    dataIndex: 'iconCls'
                },
                {
                    header: 'Usa separador',
                    flex: 1,
                    dataIndex: 'separator'
                },                
                {
                    header: 'Habilitado',
                    flex: 1,
                    dataIndex: 'enabled'
                },
                {
                    header: 'Default',
                    flex: 1,
                    dataIndex: 'isDefault'
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

