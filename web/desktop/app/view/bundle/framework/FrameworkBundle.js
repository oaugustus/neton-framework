/**
 * Bundle dashboard do sistema.
 * 
 * @class   App.view.bundle.framework.FrameworkBundle
 * @extends Neton.framework.ui.Bundle
 * @alias   dashboardbundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.FrameworkBundle',{
    extend: 'Neton.framework.ui.Bundle',
    alias: 'widget.frameworkbundle',
    
    title: 'Framework',
    
    initComponent : function(){
        var me = this;
        
        me.callParent(arguments);
    }
});


