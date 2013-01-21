/**
 * Classe base para a criação de bundles da aplicação.
 * 
 * @class   Neton.framework.ui.Bundle
 * @extends Ext.panel.Panel
 * @alias   netuibasebundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.Bundle', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.netuibasebundle',
    
    // configurações da classe base
    cls: 'bundle',
    border: false,    
    header: false,
    layout: 'card',
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me,{
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'topbar',
                    items: [
                        {
                            xtype: 'container',
                            padding: 10,
                            html: '<h3>' + me.title + '</h3>'
                        },
                        '->','-'
                    ].concat(me.getModules())
                }
            ]
        })
        
        me.callParent(arguments);
    },
    
    /**
     * Recupera os módulos que fazem parte do bundle.
     */
    getModules : function(){
        var me = this, module, modules = [];
        
        for (var name in me.modules){
            module = me.modules[name];

            modules.push({
                text: module.title,
                iconCls: module.iconCls,
                scale: 'large',
                iconAlign: 'top',
                enableToggle: true,
                allowDepress: false,
                toggleGroup: 'module_' + me.bundle,
                pressed: module.isDefault
            });  
            
            if (module.separator){
                modules.push('-');
            }
        }
        
        return modules;
    }
})

