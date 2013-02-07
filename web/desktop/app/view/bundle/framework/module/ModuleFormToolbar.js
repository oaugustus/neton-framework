/**
 * Toolbar do módulo de módulos.
 * 
 * @class   App.view.bundle.framework.module.ModuleFormToolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   moduletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.module.ModuleFormToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.moduleformtoolbar',
    
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
                    html: '<div class="breadcrumb"><b>Novo módulo</b></div>'
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

