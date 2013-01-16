/**
 * Formulário de login.
 * 
 * @class   Neton.framework.LoginForm
 * @extends Ext.form.Panel
 * @alias   netlogin
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.login.Form',{
    extend: 'Ext.form.Panel',
    alias: 'widget.netlogin',
    
    cls: 'login-container',
    border: false,
    width: 300,    
    bodyPadding: '0 29 0 29',
    padding: '20 0 20 0',
    buttonAlign: 'left',
    
    
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me,{
           fieldDefaults: {
               labelAlign: 'top'
           },
           items: [
               {
                   fieldLabel: '<b>Login</b>',
                   xtype: 'textfield',
                   anchor: '100%',
                   emptyText: 'email',
                   vtype: 'email'
               },
               {
                   fieldLabel: '<b>Senha</b>',
                   xtype: 'textfield',
                   anchor: '100%',
                   emptyText: 'senha',
                   vtype: 'email'
               }               
           ],
           buttons: [
               {
                   margin: '0 0 0 20',
                   xtype: 'netbutton',
                   action: 'primary',
                   width: 100,
                   icon: 'ok',
                   handler: function(){
                       alert('oi');
                   },
                   scale: 'medium',
                   text: 'Acessar'
               },
               '->',
               {
                   xtype: 'checkbox',
                   margin: '0 30 0 0',
                   boxLabel: 'Continar conectado'
               }
           ],
           bbar: [
               {
                   xtype: 'container',
                   html: '<a href="#">Esqueci a senha</a>',
                   margin: '15 0 0 25'
               }
           ]
        });     
                
        me.callParent(arguments);
    }
    
})


