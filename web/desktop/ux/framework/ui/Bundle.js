/**
 * Classe base para a criação de bundles da aplicação.
 * 
 * @class   Neton.framework.ui.Bundle
 * @extends Ext.panel.Panel
 * @alias   netuibasebundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.Bundle', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.netuibasebundle',
        
    // configurações da classe base
    cls: 'bundle',
    border: false,    
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me,{
            items: me.getModules()
        })
        
        me.callParent(arguments);
        
        //me.on('render', this.addModules, this);
    },
    
    /**
     * Retorna o painel que contém os módulos do sistema.
     * 
     * @return {Ext.panel.Panel}
     */
    getModuleContainer : function(){
        var me = this;
        
        // container painel, default
        if (me.moduleContainerType == 'panel'){
            return {
                xtype: 'panel',
                border: false,
                layout: 'card',
                itemId: 'moduleCt'
            }
        }else 
        // container tabpanel
        if (me.moduleContainerType == 'tab'){
            return {
                xtype: 'tabpanel',
                border: false,
                itemId: 'moduleCt'
            }        
        }
    },
    
    /**
     * Adiciona os módulos ao card layout do bundle.
     * 
     * @param {Neton.framework.ui.Bundle} bundle
     */
    addModules : function(){
        var module, bundle = this, moduleCt = bundle.up('container').up('container').down('#moduleCt');
                
        for (var name in bundle.modules){
            module = bundle.modules[name];

            try {
                moduleCt.add(this.getModuleObject(module));                
            } catch(e) {
                console.error('Classe ' + module.name +' do módulo "' + module.title + '" não foi encontrada!');
            }

        }
        
    },
    
    /**
     * Recupera o objeto de definição do módulo.
     * 
     * @param {Object} module
     * @return {Object}
     */
    getModuleObject : function(module){
        var me = this;
                
    },
    
    /**
     * Recupera os módulos que fazem parte do bundle.
     */
    getModules : function(){
        var me = this, module, btn, modules = [
            {
                xtype: 'container',
                padding: 10,
                html: '<h3>' + me.title + '</h3>'
            },
            //'->','-'
            
        ];
        
        for (var name in me.modules){
            module = me.modules[name];

            btn = {
                text: module.title,
                iconCls: module.iconCls,
                scale: 'large',
                iconAlign: 'top',
                module: module.name,
                moduleObj: module,
                bundle: me,
                isDefault: module.isDefault,
                enableToggle: true,
                allowDepress: false,
                toggleGroup: 'module_' + me.itemId,
                pressed: module.isDefault
            }
            
            modules.push(btn);  
                 
                             
            if (module.separator){
                modules.push('-');
            }
        }                
        
        return modules;
    }
})

