/**
 * Aplicação de login do sistema.
 */
Ext.application({
    name: 'App',
    appFolder: 'desktop/app',

    // bibliotecas e plugins úteis
    requires: [
        'Neton.window.Flash',
        'Neton.button.Button'
    ],
    
    // define as configurações do sistema
    settings: {
        showRegisterButton: false,
        showKeepConnection: true,
        showForgotPass: true
    },
    
    launch: function(){
        var me = this;
        
        var a = Ext.create('Neton.framework.login.Viewport', me.settings);        
    }
});
