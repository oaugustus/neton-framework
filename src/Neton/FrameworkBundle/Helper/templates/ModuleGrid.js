/**
 * Grid do módulo de [module].
 * 
 * @class   App.view.bundle.[bundle].[module].[Module]Grid
 * @extends Ext.grid.Panel
 * @alias   [module]grid
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.[bundle].[module].[Module]Grid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.[module]grid',
    
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
            store = new App.store.[bundle].[Module]Store()            
                    
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
            columns: [
            	/*<COLUMNS/>*/
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true
            }]
        });
        
        me.callParent(arguments);
    }
});

