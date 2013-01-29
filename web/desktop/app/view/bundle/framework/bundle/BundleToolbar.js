/**
 * Toolbar do módulo de bundles.
 * 
 * @class   App.view.bundle.framework.bundle.BundleToolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   bundletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.bundletoolbar',
    
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
                            text: 'Nova aplicação',
                            baseCls: 'red-btn',
                            scale: 'large'
                        },
                        {
                            xtype: 'button',
                            scale: 'large',
                            itemId: 'btnEnable',
                            margin: '0 0 0 20',
                            hidden: true,
                            tooltip: 'Habilitar',
                            iconCls: 'enable-icon'
                        },
                        {
                            xtype: 'button',
                            scale: 'large',
                            margin: '0 0 0 5',
                            hidden: true,
                            itemId: 'btnDisable',
                            tooltip: 'Desabilitar',
                            iconCls: 'disable-icon'
                        }                        
                    ]
                }
            ]
        });
        
        me.callParent(arguments);
    }
});

