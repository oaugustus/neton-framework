Ext.application({
    name: APP.name,
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
    
    config: {
        showConnectionBase: false,
        connectionBaseDirectFn: Ext.emptyFn(),
        connectionBaseField: '',        
        usernameType: 'email',
        appTitle: APP.title,
        loginTitle: 'Login',
        usernameField: 'email',
        usernameLabel: 'Email',
        passField: 'pass',
        passLabel: 'Senha',
        showForgotPass: false,
        forgotPassText: 'Esqueci a senha',
        forgotPassUrl: '/forgot',
        accessText: 'Acessar',
        showRegisterButton: false,
        registerText: 'Criar conta',
        registerUrl: '/register',
        failureMessages: {
            400: 'Usuário ou senha inválidos!'
        }
    },
    
    launch: function(){
        var a = Ext.create('Neton.silext.login.Viewport',{
            config: this.config
        });
        
        console.log(a.getAccessText());
    }
});
