/**
 * Viewport da página principal da aplicação.
 * 
 * @class   Neton.framework.ui.Viewport
 * @extends Ext.container.Viewport
 * @alisa   netuiport
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.Viewport',{
    extend: 'Ext.container.Viewport',
    alias: 'widget.netuiport',
    
    requires: [
        'Neton.framework.ui.MainToolbar',
        'Neton.framework.ui.BundleToolbar',
    ],
    
    /**
     * @cfg {Boolean} showNotificationPanel
     * Se o painel de notificação será ou não exibido
     */    
    showNotificationPanel: false,

    /**
     * @cfg {String} notificationType
     * Xtype do painel de notificação.
     */    
    notificationType: 'panel',
    
    
    // configurações
    layout: 'fit',    
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'border'
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'bundleCt',
                            layout: 'card',
                            region: 'center',
                            flex: 5
                        },
                        this.getNotificationPanel()
                    ],
                    dockedItems: [
                        {
                            xtype: 'netuimaintoolbar',
                            dock: 'top'
                        },
                        {
                            xtype: 'netuibundletoolbar',
                            dock: 'left'
                        }
                    ]
                }
            ]
        })
        
        me.callParent(arguments);
    },
    
    /**
     * Retorna o painel de notificações
     */
    getNotificationPanel : function(){
        var me = this;
        
        if (me.showNotificationPanel){
            return {
                xtype: me.notificationType,
                region: 'east',
                cls: 'notification-ct',
                flex: 1.2
            }
            
        }
    }
});

