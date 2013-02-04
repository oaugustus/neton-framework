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
                // ao clicar em um módulo
                'click' : function(btn){
                    // ativa o módulo acionado
                    btn.up('netuibasebundle').activeModule = btn;
                    this.activateModule(btn);
                }
            },
                        
            'netuibasebundle' : {
                // ao renderizar um bundle descobre qual módulo é o default
                'render' : function(bundle){
                    // define o módulo default como o módulo ativo
                    bundle.activeModule = bundle.down('button[isDefault=true]');
                },
                // ao ativar um bundle
                'activate' : function(bundle){                    
                    // aciona o botão do bundle no menu de bundles                   
                    try{
                        this.getBundleToolbar().down('button[bundle="'+bundle.itemId+'"]').toggle(true);
                    }catch(e){}
                                        
                    // ativa o módulo ativo do bundle selecionado
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
        
        // se o botão pressionado está vinculado a um bundle
        if (moduleBtn.bundle){            
            try{
                // se o container de módulos ainda não tem o módulo acionado
                if (!moduleCt.down('#'+moduleBtn.module)){
                    
                    // adiciona o módulo ao container de módulos
                    me.addModule(moduleBtn);                                  
                }

                // se o tipo do container de módulos for container
                if (moduleCt.xtype == 'container'){
                    // ativa o módulo do layout card
                    moduleCt.getLayout().setActiveItem(moduleBtn.module);
                } else {
                    // ativa o módulo do tabpanel
                    moduleCt.setActiveTab(moduleBtn.module);
                }
                
            }catch(e){
                // se ocorrer alguma falha, registra o erro ocasionado
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
        
        // recupera o tipo de container de módulos
        moduleContainerType = btn.up('netuiport').moduleContainerType;
                                
        // se for do tipo painel
        if (moduleContainerType == 'panel'){
            // adiciona o módulo ao container com layout card
            me.getModuleCt().add({
                xtype: module.name,
                module: module,
                listeners: {
                    // registra evento ao ativar o módulo para pressionar o bundle em questão
                    'activate' : function(){
                        this.activateBundle(btn.bundle.itemId);
                    },
                    scope: this
                },
                itemId: module.name
            });            
        }else {
            // adiciona o módulo ao container do tipo tabpanel
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
        
        // carrega os módulos que o usuário tem acesso
        Actions.NetonFramework_Module.loadModules({}, function(list){
            var tb = me.getBundleToolbar(), bundle, items = [], 
                bundleCt = me.getBundleCt();
            
            for (var bundleName in list){
                
                bundle = list[bundleName];
                                
                // adiciona à lista de itens a definição do objeto do botão do bundle
                items.push(me.getBundleButton(bundle));


                try{
                    // adiciona a toolbar de cada bundle ao container de bundles
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
            
            // adiciona o botão do bundle à toolbar de bundles
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

