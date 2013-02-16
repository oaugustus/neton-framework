/**
 * Viewport da página de login.
 * 
 * @class   Neton.framework.login.Viewport
 * @extends Ext.container.Viewport
 * @alisa   netloginport
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.login.Viewport',{
    extend: 'Ext.container.Viewport',
    alias: 'widget.netloginport',
    
    /**
     * @cfg {Boolean} showLogo
     * Se a logomarca será ou não exibida.
     */    
    showLogo: true,
    
    /**
     * @cfg {Int} logoWidth
     * Largura da logo.
     */    
    logoWidth: 50,
    
    /**
     * @cfg {Int} logoHeight
     * Altura da logo.
     */    
    logoHeight: 50,    
    
    /**
     * @cfg {Boolean} showConnectionBase
     * Se o campo de base de conexão será ou não exibido.
     */    
    showConnectionBase: false,

    /**
     * @cfg {Object} connectionBaseDirectFn
     * A função remota que irá carregar o datastore de base de conexão.
     */
    connectionBaseDirectFn: Ext.emptyFn(),
    
    /**
     * @cfg {String} connectionBaseField
     * Nome do campo de base de conexão
     */
    connectionBaseField: 'connection',        
    
    /**
     * @cfg {String} usernameType
     * Tipo do campo username [email, alpha, int].
     */    
    usernameType: 'email',

    /**
     * @cfg {String} appTitle
     * Título da aplicação exibido na toolbar principal da interface de login.
     */    
    appTitle: APP.title,
    
    /**
     * @cfg {String} loginTitle
     * Título do formulário de login.
     */        
    loginTitle: 'Login',
    
    /**
     * @cfg {String} usernameField
     * Nome do campo username.
     */        
    usernameField: 'email',
    
    /**
     * @cfg {String} usernameLabel
     * Label do campo username.
     */        
    usernameLabel: '<b>Email</b>',
    
    /**
     * @cfg {String} passField
     * Nome do campo pass.
     */        
    passField: 'pass',
    
    /**
     * @cfg {String} passLabel
     * Label do campo senha.
     */        
    passLabel: '<b>Senha</b>',
    
    /**
     * @cfg {Boolean} showForgotPass
     * Se será exibido o link de recuperação de senha.
     */        
    showForgotPass: false,
    
    /**
     * @cfg {String} forgotPassText
     * Texto do link de recuperação de senha.
     */        
    forgotPassText: 'Esqueci a senha',
    
    /**
     * @cfg {String} forgotPassUrl
     * Url de recuperação de senha.
     */        
    forgotPassUrl: 'forgot',
    
    /**
     * @cfg {String} accessText
     * Texto do botão de acesso.
     */        
    accessText: 'Acessar',
        
    /**
     * @cfg {Function} authMethod
     * Método remoto que será utilizado para realizar a autenticação.
     */
    authMethod: Actions.NetonFramework_Security.auth,
    
    /**
     * @cfg {String} keepConnectionText
     * Label do campo de manter conexão.
     */    
    keepConnectionText: 'Continuar conectado',
    
    /**
     * @cfg {Boolean} showKeepConnection
     * Se irá ou não exibir o campo de manter conexão.
     */    
    showKeepConnection: false,
    
    /**
     * @cfg {Boolean} showRegisterButton
     * Se o botão de registro será ou não exibido.
     */        
    showRegisterButton: false,
    
    /**
     * @cfg {String} registerText
     * Texto do botão de registro de conta.
     */        
    registerText: 'Criar uma conta',
    
    /**
     * @cfg {String} registerUrl
     * Url da página de registro de conta.
     */        
    registerUrl: 'register',
    
    /**
     * @cfg {Object} failureMessages
     * Mensagens de erro de autenticação.
     */        
    failureMessages: {
        400: 'Usuário ou senha inválidos!',
        401: 'Por favor, preencha os campos destacados!',
        403: 'O usuário está desabilitado, entre em contato com o administrador!',
        404: 'O grupo de usuário está desabilitado, entre em contato com o administrador!'
    },

    layout: 'fit',
    cls: 'login-viewport',
    
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me, {

            items: [
                {
                    xtype: 'panel',
                    baseCls: 'x-plain',
                    tbar: me.getHeaderBar(),
                    items: [
                        this.getForm()
                    ]
                }
            ]
        })
        
        me.callParent(arguments);    
        
        // registra os eventos de manipulação do componente
        me.on('render', me.registerEvents, me);
    },
    
    
    /**
     * Retorna a toolbar de cabeçalho da página de login.
     * 
     * @return {Array} Definição da toolbar
     */
    getHeaderBar : function(){
        var me = this,
            bar = [];
        
        
        // adiciona a logomarca da aplicação
        if (me.showLogo){
            bar.push({
                xtype: 'image',
                src: APP.webpath + '/resources/img/logo.png',
                width: me.logoWidth,
                height: me.logoHeight
            })
        }
        
        // adiciona o título da aplicação
        bar.push(
            {
                xtype: 'container',
                html: '<h1>' + me.appTitle + '</h1>'
            },'->'            
        );
        
        
        // adiciona o botão de registro de conta
        if (me.showRegisterButton){
            bar.push({
                xtype: 'container',                
                items: [
                    {
                        xtype: 'button',
                        baseCls: 'red-btn',
                        text: me.registerText,
                        tabIndex: 6,
                        scale: 'medium',
                        href: me.registerUrl
                    }
                ]                
            });
        }
        
        return bar;
    },
    
    /**
     * Cria a definição do formulário de login.
     * 
     * @return {Object} definição do formulário de login.
     */
    getForm : function(){
        var me = this, form, items = [], forgotCt,
            buttons = {
                xtype: 'toolbar', 
                dock: 'bottom',
                height: 70,
                //margin: '0 25 0 20 0',
                items: []
            };
        
        // campo de base de conexão
        if (me.showConnectionBase){
            items.push(me.getConnectionBase());
        }        
        
        // cria os campos de login e senha
        items = items.concat(me.getBasicFormFields());
        
        // cria o botão de acesso
        buttons.items.push({
            xtype: 'button',
            baseCls: 'blue-btn',
            tabIndex: 3,
            itemId: 'btnAccess',
            scale: 'large',
            margin: '0 0 0 20',
            scope: me,
            handler: me.onAccessClick,
            text: me.accessText            
        });
        
        // checkbox de manter conexão
        if (me.showKeepConnection){
            buttons.items.push('->',{
                xtype: 'checkbox',
                tabIndex: 4,
                margin: '0 29 0 0',
                boxLabel: me.keepConnectionText                
            });
        }
        
        // link de recuperação de senha
        forgotCt = {
            xtype: 'container',
            dock: 'bottom',
            height: 10,
            margin: '0 25 0 25',
            html: '<a href="' + me.forgotPassUrl +'" tabindex="5">' + me.forgotPassText + '</a>'
        }
        
        // cria a definição do formulário
        form = {
            xtype: 'form',
            title: me.loginTitle,
            cls: 'login-container',
            border: false,
            layout: 'anchor',
            width: 300,    
            bodyPadding: '0 29 0 29',
            padding: '20 0 20 0',
            buttonAlign: 'left',
            items: items,
            buttons: buttons,
            dockedItems: [
                me.showForgotPass ? forgotCt : null               
            ]
        }
        
        
        // retorna o formulário criado
        return form;
    },
    
    /**
     * Retorna a definição dos campos de login e senha do formulário.
     * 
     * @return {Array}
     */
    getBasicFormFields : function(){
        var me = this;
        
        return [
            {
                xtype: me.usernameType == 'int' ? 'numberfield' : 'textfield',
                vtype: me.usernameType == 'email' ? 'email' : 'alphanum',
                allowBlank: false,
                tabIndex: 1,
                msgTarget: 'side',
                enableKeyEvents: true,
                name: me.usernameField,
                margin: '0 0 10 0',
                fieldLabel: me.usernameLabel,
                labelAlign: 'top',
                anchor: '100%'
            },{
                xtype: 'textfield',            
                allowBlank: false,
                tabIndex: 2,
                msgTarget: 'side',
                enableKeyEvents: true,
                fieldLabel: me.passLabel,
                name: me.passField,
                inputType: 'password',
                labelAlign: 'top',
                anchor: '100%'            
            }            
        ]
    },
    
    /**
     * Registra eventos para o componente
     */
    registerEvents : function(){
        var me = this;
        
        if (!me.showConnectionBase){
            // coloca o campo no campo de login
            me.down('[name="'+me.usernameField+'"]').on('render', me.setInitialFocus, me);
        } else {
            // coloca o campo no campo de login
            me.down('[name="'+me.connectionBaseField+'"]').on('render', me.setInitialFocus, me);            
        }            

        // registra evento para o campo username
        me.down('[name="' + me.usernameField + '"]').on('keypress', me.checkPassFocus, me);
        
        // registra evento para o campo pass
        me.down('[name="' + me.passField + '"]').on('keypress', me.checkAccessFocus, me);

    },
    
    /**
     * Seta o foco inicial no campo do formulário de login.
     * 
     * @param {Ext.form.Field} field
     * @param {int} ms
     */
    setInitialFocus : function(field, ms){
        if (!ms)
            field.focus(250);
        else 
            field.focus(ms);
    },
    
    /**
     * Acionado quando o botão de acesso for clicado.
     * Valida o formulário de login e chama o método remoto de autenticação.
     * 
     * @param {Ext.button.Button} btn
     */
    onAccessClick : function(btn){
        var me = this;
        
        // se o formulário for validado
        if (btn.up('form').getForm().isValid()){
            // cria a máscara de carregamento no botão
            btn.setLoading({
                msg: '...',
                width: btn.getWidth()-5
            });
            
            // aciona o método remoto de autenticação
            me.authMethod(btn.up('form').getValues(),me.authCallback, me);
        }else{
            Neton.Msg.flash({
                type: 'error',
                width: 300,
                msg: me.failureMessages[401],
                callback: function(){
                    if (!me.showConnectionBase){
                        // coloca o campo no campo de login
                        me.setInitialFocus(me.down('[name="'+me.usernameField+'"]'));
                    } else {
                        // coloca o campo no campo de login
                        me.setInitialFocus(me.down('[name="'+me.connectionBaseField+'"]'));            
                    }            
                    
                }
            });
        }
    },
    
    /**
     * Verifica se a tecla pressionada no campo username foi a tecla enter e, 
     * nesse caso, coloca o foco no campo de senha.
     * 
     * @param {Ext.form.TextField} txt
     * @param {Ext.Event} ev
     */
    checkPassFocus : function(txt, ev){
        var me = this;
        
        if (ev.getKey() == 13){
            me.down('[name="'+me.passField+'"]').focus();
        }
    },
    
    /**
     * Verifica se a tecla pressionada no campo pass foi a tecla enter e, 
     * nesse caso, aciona a ação do clique do botão de acesso.
     * 
     * @param {Ext.form.TextField} txt
     * @param {Ext.Event} ev
     */
    checkAccessFocus : function(txt, ev){
        var me = this;
        
        if (ev.getKey() == 13){
            me.onAccessClick(me.down('#btnAccess'));
        }        
    },
    
    /**
     * Manipula a resposta do método de autenticação.
     * 
     * @param {Object} response
     */
    authCallback : function(response){
        var me = this;
        
        // desabilita a máscara de carregamento no botão access
        me.down('#btnAccess').setLoading(false);
        
        if (response.code == 200){
            // redireciona o usuário para a página de acesso restrito
            self.location = response.secureUrl;
        }else {
            // exibe mensagem de erro
            Neton.Msg.flash({
                type: 'error',
                //width: 300,
                msg: me.failureMessages[response.code],
                callback: function(){
                    if (!me.showConnectionBase){
                        // coloca o campo no campo de login
                        me.setInitialFocus(me.down('[name="'+me.usernameField+'"]'));
                    } else {
                        // coloca o campo no campo de login
                        me.setInitialFocus(me.down('[name="'+me.connectionBaseField+'"]'));            
                    }            
                    
                }                
            });
        }
    }
    
});