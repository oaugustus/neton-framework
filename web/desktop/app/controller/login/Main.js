Ext.define('App.controller.login.Main', {
    extend: 'Ext.app.Controller',
    
    init : function(){
        // registra evento para o botão de acesso
        //Ext.get('btnAccess').on('click', this.onAccessClick);
    },
    
    /**
     * Acionado quando o botão de acesso é clicado.
     * 
     * @param {Ext.Element} btn
     */
    onAccessClick : function(btn){
        //alert('oi');
        //Ext.get('btnAccess').addCls('disabled');
    }
});