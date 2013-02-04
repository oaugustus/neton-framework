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
        'Neton.framework.ui.HelpCmdToolbar',
    ],
    
    /**
     * @cfg {Boolean} moduleContainerType
     * Tipo do container de módulos.
     */    
    moduleContainerType: 'panel',
    
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
        
        Ext.apply(me, me.settings);
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'border'
                    },
                    //border: false,
                    bodyPadding: 3,
                    items: [
                        {
                            xtype: 'container',
                            region: 'center',
                            style: 'border: solid 1px #ccc;',
                            flex: 5,
                            layout: {
                                type: 'border',
                                align: 'stretchmax'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    region: 'north',
                                    layout: 'card',
                                    moduleContainerType: me.moduleContainerType,
                                    itemId: 'bundleCt'
                                },
                                this.getModuleContainer()
                            ]
                        },
                        this.getNotificationPanel()
                    ],
                    dockedItems: [
                        {
                            xtype: 'netuimaintoolbar',
                            settings: me.settings,
                            dock: 'top'
                        },
                        {
                            xtype: 'netuibundletoolbar',
                            settings: me.settings,
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
    },
    
    /**
     * Recupera o container de módulos.
     * 
     * @return {Object}
     */
    getModuleContainer : function(){
        var me = this;
        
        if (me.moduleContainerType == 'panel'){
            return {
                xtype: 'container',
                itemId: 'moduleCt',
                layout: 'card',
                style: 'border-top: solid 1px #ccc;',
                region: 'center'
            }
            
        } else {
            return {
                xtype: 'tabpanel',
                border: false,
                itemId: 'moduleCt',
                region: 'center'
            }            
        }
    }
});

