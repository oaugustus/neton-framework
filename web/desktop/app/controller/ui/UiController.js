/**
 * Controlador da interface de usuário do sistema.
 * 
 * @class   App.controller.ui.UiController
 * @extends Ext.app.Controller
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.controller.ui.UiController',{
    extend: 'Ext.app.Controller',
    
    // referências aos componentes
    refs: [
        {selector: 'netuimaintoolbar', ref: 'mainToolbar'},
        {selector: 'netuibundletoolbar', ref: 'bundleToolbar'},
        {selector: '#bundleCt', ref: 'bundleCt'}
    ],
    
    init : function(){
        
        this.control({
            'netuibundletoolbar' : {
                'render': this.loadModules
            },
            
            'netuibundletoolbar button' : {
                'click': function(btn){
                    this.activateBundle(btn.bundle)
                }
            }
        })
        // registra o evento para a atualização dos dados do usuário na toolbar 
        // do sistema
        this.application.on('sessionchange', this.updateUserInfo, this);
    },
    
    /**
     * Atualiza as informações do usuário logado na toolbar principal do sistema.
     * 
     * @param {Object} session
     */
    updateUserInfo : function(session){
        var tb = this.getMainToolbar();
        
        tb.down('#ctUserInfo').update(session['user.username']);
    },
    
    /**
     * Ativa o bundle na área de container da aplicação.
     * 
     * @param {string} bundleName
     */
    activateBundle : function(bundleName){
        var me = this, bundleCt = me.getBundleCt();
        
        console.log(bundleCt);
        
        bundleCt.getLayout().setActiveItem(bundleName);
    },
    
    /**
     * Carrega os módulos da aplicação.
     */
    loadModules : function(){
        var me = this;        
        
        Actions.NetonFramework_Module.loadModules({}, function(list){
            var tb = me.getBundleToolbar(), bundle, items = [], 
                bundleCt = me.getBundleCt();
            
            for (var bundleName in list){
                
                bundle = list[bundleName];
                                
                items.push(me.getBundleButton(bundle));

                bundleCt.add({
                    xtype: bundle.name,
                    itemId: bundle.name,
                    modules: bundle.modules
                })
            }            
            
            tb.add(items);
        })
    },
    
    /**
     * Recupera o botão da toolbar de bundles.
     * 
     * @param {Object} bundle
     */
    getBundleButton : function(bundle){
        return {
            text: bundle.title,
            iconCls: bundle.iconCls,
            enableToggle: true,
            allowDepress: false,
            bundle: bundle.name,
            pressed: bundle.isDefault,
            toggleGroup: 'bundle',
            iconAlign: 'top',
            scale: 'large'
        }        
    }
})

