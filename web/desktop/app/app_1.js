/**
 * Aplicação principal do sistema.
 */
Ext.application({
    name: 'App',
    appFolder: 'desktop/app',

    // bibliotecas e plugins úteis
    requires: [
        'Neton.window.Flash',
        'Neton.button.Button'
    ],
    
    // controladores utilizados na aplicação
    controllers: [ 
        /*<CONTROLLERS>*/
        'ui.UiController',
        
        'bundle.framework.FrameworkController',
        'bundle.framework.setting.SettingController',
        'bundle.framework.bundle.BundleController',
        
        'bundle.dashboard.DashboardController',
        
        'bundle.setting.SettingController',
        'bundle.setting.usergroup.UserGroupController'
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
    }

});
