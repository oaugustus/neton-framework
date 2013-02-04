/**
 * Toolbar do módulo de bundles.
 * 
 * @class   App.view.bundle.framework.bundle.BundleToolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   bundletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleGridToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.bundlegridtoolbar',
    
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
                            showWith: '1+',
                            hidden: true,
                            tooltip: 'Habilitar',
                            iconCls: 'enable-icon'
                        },
                        {
                            xtype: 'button',
                            scale: 'large',
                            margin: '0 0 0 5',
                            hidden: true,
                            showWith: '1+',
                            itemId: 'btnDisable',
                            tooltip: 'Desabilitar',
                            iconCls: 'disable-icon'
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
                }
            ]
        });
        
        me.callParent(arguments);
    }
});

