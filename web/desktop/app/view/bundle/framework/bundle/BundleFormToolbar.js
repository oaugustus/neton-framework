/**
 * Toolbar do módulo de bundles.
 * 
 * @class   App.view.bundle.framework.bundle.BundleFormToolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   bundletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleFormToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.bundleformtoolbar',
    
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
                    itemId: 'formTitle',
                    cls: 'breadcrumb',                    
                    html: '<b>Nova aplicação</b>'
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnSave',
                            text: 'Salvar',
                            baseCls: 'blue-btn',
                            scale: 'large'
                        }
                    ]
                },'-',
                {
                    text: 'Voltar para a lista',
                    itemId: 'btnBack'
                },'->',
                {
                    xtype: 'checkbox',
                    checked: true,
                    itemId: 'ckKeepOpened',
                    margin: '0 5 0 0',
                    boxLabel: 'Salvar e criar novo registro'
                }
            ]
        });
        
        me.callParent(arguments);
    }
});

