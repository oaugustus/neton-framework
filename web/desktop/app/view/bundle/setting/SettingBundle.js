/**
 * Bundle configurações do sistema do sistema.
 * 
 * @class   App.view.bundle.setting.SettingBundle
 * @extends Neton.framework.ui.Bundle
 * @alias   dashboardbundle
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.setting.SettingBundle',{
    extend: 'Neton.framework.ui.Bundle',
    alias: 'widget.settingbundle',
    
    title: 'Configurações',
    
    initComponent : function(){
        var me = this;
        
        me.callParent(arguments);
    }
});


