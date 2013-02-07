/**
 * Bundle request do sistema.
 * 
 * @class   App.view.bundle.request.RequestBundle
 * @extends Neton.framework.ui.Bundle
 * @alias   requestbundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.request.RequestBundle',{
    extend: 'Neton.framework.ui.Bundle',
    alias: 'widget.requestbundle',    
    
    title: "Solicitações",
    
    initComponent : function(){
        var me = this;
        
        me.callParent(arguments);
    }
});