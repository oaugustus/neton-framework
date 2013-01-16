Ext.application({
    name: 'App',
    appFolder: 'desktop/app',

    requires: [
        'Neton.window.Flash',
        'Neton.button.Button'
    ],

    controllers: [
        'login.Main'
    ],
    
    views: [
        'login.LoginForm'
    ],
    
    settings: {
        showRegisterButton: true,
        showKeepConnection: true,
        showForgotPass: true
    },
    
    launch: function(){
        var me = this;
        
        var a = Ext.create('Neton.framework.login.Viewport', me.settings);        
    }
});
