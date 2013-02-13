/**
 * Toolbar do módulo de [module].
 * 
 * @class   App.view.bundle.[bundle].[module].[Module]Toolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   [module]gridtoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.[bundle].[module].[Module]GridToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.[module]gridtoolbar',
    
    padding: 5,
    
    /**
     * Inicializa a toolbar
     */
    initComponent : function(){
        var me = this;
            
        Ext.applyIf(me,{
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnNew',
                            text: 'Novo',
                            baseCls: 'red-btn',                            
                            scale: 'large'
                        },
                        {
                            xtype: 'button',
                            scale: 'large',
                            margin: '0 0 0 20',
                            hidden: true,
                            showWith: '1+',
                            itemId: 'btnDelete',
                            tooltip: 'Excluir',
                            iconCls: 'delete-icon'
                        }                                                                        
                    ]
                },
                '->',
                {
                    xtype: 'searchfield',
                    emptyText: 'busca simples',
                    width: 180
                }
                
            ]
        });
        
        me.callParent(arguments);
    }
});

