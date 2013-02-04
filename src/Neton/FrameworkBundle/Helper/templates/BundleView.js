/**
 * Bundle [bundle] do sistema.
 * 
 * @class   App.view.bundle.[bundle].[Bundle]Bundle
 * @extends Neton.framework.ui.Bundle
 * @alias   [bundle]bundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.[bundle].[Bundle]Bundle',{
    extend: 'Neton.framework.ui.Bundle',
    alias: 'widget.[bundle]bundle',    
    
    title: "[title]",
    
    initComponent : function(){
        var me = this;
        
        me.callParent(arguments);
    }
});