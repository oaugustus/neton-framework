/**
 * Bundle dashboard do sistema.
 * 
 * @class   App.view.bundle.dashboard.DashboardBundle
 * @extends Neton.framework.ui.Bundle
 * @alias   dashboardbundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.dashboard.DashboardBundle',{
    extend: 'Neton.framework.ui.Bundle',
    alias: 'widget.dashboardbundle',
    
    title: 'Dashboard',
    
    initComponent : function(){
        var me = this;
        
        me.callParent(arguments);
    }
});


