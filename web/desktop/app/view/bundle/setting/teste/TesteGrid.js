/**
 * Grid do módulo de teste.
 * 
 * @class   App.view.bundle.setting.teste.TesteGrid
 * @extends Ext.grid.Panel
 * @alias   testegrid
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.setting.teste.TesteGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.testegrid',
    
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
            //store = new App.store.setting.TesteStore()            
                    
        Ext.applyIf(me,{
            //store: store,
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

