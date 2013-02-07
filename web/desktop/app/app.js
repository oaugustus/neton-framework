/**
 * Aplicação principal do sistema.
 */
Ext.application({
    name: 'App',
    appFolder: 'desktop/app',

    // bibliotecas e plugins úteis
    requires: [
        'Neton.window.Flash',
        'Neton.button.Button',
        'Ext.ux.grid.FiltersFeature',
        'Ext.ux.form.SearchField'
    ],
    
    // controladores utilizados na aplicação
    controllers: [ 
        /*<CONTROLLERS>*/        
        'ui.UiController'
        ,'bundle.dashboard.DashboardController'
        ,'bundle.framework.FrameworkController'
        ,'bundle.framework.bundle.BundleController'
        ,'bundle.framework.setting.SettingController'
        ,'bundle.framework.module.ModuleController'
        ,'bundle.setting.SettingController'
        ,'bundle.setting.usergroup.UserGroupController'
        /*</CONTROLLERS>*/
    ],
    
    // define as configurações do sistema
    settings: {
        showRegisterButton: false,
        showKeepConnection: true,
        showForgotPass: true,
        sessionRefresh: 60000,
        expirationTitle: 'SESSÃO EXPIRADA',        
        expirationMsg: 'Sua sessão expirou e foi fechada. Efetue login novamente!',
        sessionFaultTitle: 'ACESSO RESTRITO',
        sessionFaultMsg: 'A página que você está tentando acessar é restrita a usuários registrados!'
    },
    
    /**
     * Ao acionar a aplicação.
     */
    launch: function(){
        var me = this;
        
        // verifica se o usuário está logado
        Actions.NetonFramework_Security.isLogged({}, function(r){
            
            // se não existe sessão aberta para o usuário
            if (typeof(r) == 'string'){
                
                // exibe mensagem de erro
                Ext.Msg.alert(me.settings.sessionFaultTitle, me.settings.sessionFaultMsg, function(){
                    
                    // redireciona o visitante para a página de login
                    self.location = r;                
                    
                });
                
            } else { // se existe uma sessão aberta para o usuário

                // carrega as configurações do framework
                Actions.NetonFramework_Setting.list({}, function(r){   
                    Ext.apply(me.settings, r);
                    
                    // cria e renderiza a interface do sistema
                    var a = Ext.create('Neton.framework.ui.Viewport', {
                        settings: me.settings,
                        listeners: {
                            'render': me.registerTasks,
                            scope: me
                        }
                    });  
                });
                
            }            
        },me);
        
        // adiciona o evento de mudança da sessão
        me.addEvents(
            'sessionchange' 
        );
    },
    
    /**
     * Registra tarefas a serem executadas durante a execução do sistema.
     */
    registerTasks : function(){
        var me = this;
        
        Ext.TaskManager.start({
            run: this.updateSession,
            scope: me,
            interval: me.settings.sessionRefresh
        });    
        
        this.registerKeyMap();
    },
    
    /**
     * Atualiza a referência da sessão aberta para o usuário na interface.
     * 
     * @session
     */
    updateSession : function(){
        var me = this;
        Actions.NetonFramework_Security.isLogged({}, function(r){
            if (typeof(r) == 'string'){
                Ext.Msg.alert(me.settings.expirationTitle, me.settings.expirationMsg, function(){
                    self.location = r;                
                });
            } else {
                
                if (!me.isSameObject(r, me.session)){
                    me.session = r;
                    
                    me.fireEvent('sessionchange',me.session);
                }                
            }        
            
        },me)
    },
    
    
    /**
     * Verifica se é o mesmo objeto.
     * 
     * @param {Object} a
     * @param {Object} b
     */
    isSameObject : function(a, b) {
        
        // se o objeto for indefinido retorna false
        if (a == undefined || b == undefined){
            return false;
        }
        
        // confere cada propriedade 
        for (var i in a) {
            if (a.hasOwnProperty(i) && b.hasOwnProperty(i) && a[i] === b[i]) {
                return true;
            }
        }
        
        return false;
    },
    
    /**
     * Seta o controlador do bundle ativo.
     * 
     * @param {Object} module
     */
    setActiveModule : function(module){
        this.activeModule = module;
    },
    
    /**
     * Registra o mapa de teclas para os atalhos de teclado.
     * 
     * @param {Ext.form.Panel} form
     */
    registerKeyMap : function(form){
        var save, esc, createNew,backspace, del;     
        
        // registra evento global para salvar formulário aberto ao pressionar Ctrl + S
        save = new Ext.util.KeyMap(Ext.getBody(), [{
           key: Ext.EventObject.S,
           ctrl: true,
           defaultEventAction: 'preventDefault',
           scope: this,
           fn: function(){
               try{
                   this.activeModule.onSavePress();
               } catch(e){}
           }
        }]);                               
    
        // registra evento global para fechar formulário aberto ao pressionar ESC
        esc = new Ext.util.KeyMap(Ext.getBody(), [{
           key: Ext.EventObject.ESC,
           defaultEventAction: 'preventDefault',
           scope: this,
           fn: function(){
               try{
                   this.activeModule.onEscPress();
               } catch(e){}               
           }
        }]);                                   
    
        // registra evento global para abrir formulário ao pressionar Ctrl + C
        createNew = new Ext.util.KeyMap(Ext.getBody(), [{
           key: Ext.EventObject.C,
           ctrl: true,
           defaultEventAction: 'preventDefault',
           scope: this,
           fn: function(){
               try{
                   this.activeModule.onNewPress();
               } catch(e){}               
           }
        }]);                                   
    
        // registra evento global para prevenir o carregamento da página anterior do navegador
        backspace = new Ext.util.KeyMap(document, [{
           key: Ext.EventObject.BACKSPACE,
           defaultEventAction: 'preventDefault',
           scope: this,
           fn: function(e, ev){
               if (ev.target.type == 'text')
                   return true;
               return false;
           }
        }]);                                   
    
        // registra evento global para prevenir o carregamento da página anterior do navegador
        del = new Ext.util.KeyMap(document, [{
           key: Ext.EventObject.DELETE,
           defaultEventAction: 'preventDefault',
           scope: this,
           fn: function(){
               if (ev.target.type == 'text')
                   return true;
               return false;
           }
        }]);                                   
    
    }    

});
