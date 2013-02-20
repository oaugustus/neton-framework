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
                    
        Ext.applyIf(me,{
            cls: 'neton-grid',
            selModel: sm,
            features: [
            	{
					ftype: 'filters',
                   	encode: 'json'               	
            	}
            ],
            columns: [
				{
					header: 'IntField',
					dataIndex: 'intField',
					flex: 1,
					filter: {
						type: 'numeric'
					}
				},
				{
					header: 'MoneyField',
					dataIndex: 'moneyField',
					flex: 1,
					filter: {
						type: 'numeric'
					}
				},
				{
					header: 'FloatField',
					dataIndex: 'floatField',
					flex: 1,
					filter: {
						type: 'numeric'
					}
				},
				{
					header: 'TextField',
					dataIndex: 'textField',
					flex: 1,
					filter: {
						type: 'string'
					}
				},
				{
					header: 'RadioField',
					dataIndex: 'radioField',
					flex: 1,
					filter: {
						type: 'boolean'
					}
				},
				{
					header: 'TextareaField',
					dataIndex: 'textareaField',
					flex: 1,
					filter: {
						type: 'string'
					}
				},
				{
					header: 'TimeField',
					dataIndex: 'timeField',
					flex: 1,
					filter: {
						type: 'string'
					}
				},
				{
					header: 'DateField',
					dataIndex: 'dateField',
					flex: 1,
					filter: {
						type: 'date'
					}
				},
				{
					header: 'Test',
					dataIndex: 'test',
					flex: 1,
					filter: {
						type: 'string'
					}
				}
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

