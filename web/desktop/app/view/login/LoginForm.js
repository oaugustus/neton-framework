/**
 * Janela de Login
 */
Ext.define('App.view.login.LoginForm',{
    extend: 'Neton.framework.login.Form',
    alias: 'widget.wgloginform',  
    title: 'Login',
        
    initComponent : function(){
        var me = this;
                
        me.callParent(arguments);
    }
})


