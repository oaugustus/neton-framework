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
        'ui.UiController',
        
        // bundle framework
        'bundle.framework.FrameworkController',
        'bundle.framework.setting.SettingController',
        
        // bundle dashboard
        'bundle.dashboard.DashboardController',
        
        // bundle de configurações
        'bundle.setting.SettingController',
        'bundle.setting.usergroup.UserGroupController'
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
        
        Actions.NetonFramework_Security.isLogged({}, function(r){
            if (typeof(r) == 'string'){
                Ext.Msg.alert(me.settings.sessionFaultTitle, me.settings.sessionFaultMsg, function(){
                    self.location = r;                
                });
            } else {
                var a = Ext.create('Neton.framework.ui.Viewport', {
                    listeners: {
                        'render': me.registerTasks,
                        scope: this
                    }
                });  
                
            }            
        },me);
        
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
