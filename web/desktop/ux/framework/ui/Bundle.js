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
            // recupera os itens do bundle (botões do menu de módulos do bundle)
            items: me.getModules()
        })
        
        me.callParent(arguments);        
    },
    
    /**
     * Retorna o painel que contém os módulos do sistema.
     * 
     * @return {Ext.panel.Panel}
     *
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
    },*/
    
    /**
     * Adiciona os módulos ao card layout do bundle.
     * 
     * @param {Neton.framework.ui.Bundle} bundle
     *
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
        
    },*/
        
    /**
     * Recupera os módulos que fazem parte do bundle.
     */
    getModules : function(){
        var me = this, module, btn, 
            modules = [
                { // adiciona à barra de módulos do bundle o título do bundle
                    xtype: 'container',
                    padding: 10,
                    html: '<h3>' + me.title + '</h3>'
                },            
            ];
        
        // para cada módulo do bundle
        for (var name in me.modules){
            module = me.modules[name];

            btn = { // cria a definição do botão do módulo
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
            
            // adiciona o botão do módulo à lista dos módulos do bundle
            modules.push(btn);  
                 
                             
            if (module.separator){
                modules.push('-');
            }
        }                
        
        // retorna os módulos do bundle
        return modules;
    }
})

