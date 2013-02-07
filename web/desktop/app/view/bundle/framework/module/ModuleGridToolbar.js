/**
 * Toolbar do módulo de módulos.
 * 
 * @class   App.view.bundle.framework.module.ModuleToolbar
 * @extends Ext.toolbar.Toolbar
 * @alias   moduletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.module.ModuleGridToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.modulegridtoolbar',
    
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
                            text: 'Novo Módulo',
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

