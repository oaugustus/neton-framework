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
        {selector: '#bundleCt', ref: 'bundleCt'},
        {selector: '#moduleCt', ref: 'moduleCt'}
    ],
    
    init : function(){
        
        this.control({
            // barra lateral de bundles
            'netuibundletoolbar' : {
                'render': this.loadModules
            },
            
            // barra superior de módulos
            'netuibasebundle button' : {
                'click' : function(btn){
                    btn.up('netuibasebundle').activeModule = btn;
                    this.activateModule(btn);
                }
            },
            
            'netuibasebundle' : {
                'render' : function(bundle){
                    bundle.activeModule = bundle.down('button[isDefault=true]');
                },
                'activate' : function(bundle){
                   this.getBundleToolbar().down('button[bundle="'+bundle.itemId+'"]').toggle(true);
                   this.activateModule(bundle.activeModule);
                }
            },
            
            'netuibundletoolbar button' : {
                'click': function(btn){
                    this.activateBundle(btn.bundle, btn)
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
     * Ativa o módulo no painel de visualização do bundle.
     * 
     * @param {Ext.button.Button} moduleBtn
     */
    activateModule : function(moduleBtn){
        var me = this, moduleCt = me.getModuleCt();
        
        if (moduleBtn.bundle){            
            try{
                if (!moduleCt.down('#'+moduleBtn.module)){
                    me.addModule(moduleBtn);                                  
                }

                if (moduleCt.xtype == 'container'){
                    moduleCt.getLayout().setActiveItem(moduleBtn.module);
                } else {
                    moduleCt.setActiveTab(moduleBtn.module);
                }
                
            }catch(e){
                console.error('O módulo '+ moduleBtn.module + ' não foi encontrado!');
            }
        }
    },
    
    /**
     * Adiciona um módulo ao container de módulos.
     * 
     * @param {Ext.button.Button} btn
     */
    addModule : function(btn){
        var me = this, moduleContainerType = 'panel',
            module = btn.moduleObj;
        
        moduleContainerType = btn.up('netuiport').moduleContainerType;
                                
        if (moduleContainerType == 'panel'){
            me.getModuleCt().add({
                xtype: module.name,
                module: module,
                listeners: {
                    'activate' : function(){
                        this.activateBundle(btn.bundle.itemId);
                    },
                    scope: this
                },
                itemId: module.name
            });            
        }else {
            me.getModuleCt().add({
                xtype: module.name,
                title: module.title,
                closable: true,
                listeners: {
                    'activate' : function(){
                        this.activateBundle(btn.bundle.itemId);
                    },
                    scope: this
                },
                module: module,
                closeAction: 'hide',
                itemId: module.name
            });                        
        }
        
    },
    
    /**
     * Ativa o bundle na área de container da aplicação.
     * 
     * @param {string} bundleName
     */
    activateBundle : function(bundleName){
        var me = this, bundleCt = me.getBundleCt();
        
        try{
            bundleCt.getLayout().setActiveItem(bundleName);
        }catch(e){
            console.error('O bundle '+ bundleName+' não encontrado!');
        }
        
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


                try{
                    bundleCt.add({
                        xtype: bundle.name,
                        itemId: bundle.name,
                        isDefault: bundle.isDefault,
                        moduleContainerType: bundleCt.moduleContainerType,
                        modules: bundle.modules
                    });        
                    
                    if (bundle.isDefault){
                        bundleCt.getLayout().setActiveItem(bundle.name);
                    }
                }catch(e){
                    console.error('A classe ' + bundle.name + ' do bundle '+ bundle.title +' não foi carregada!');
                }
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

