/**
 * Controlador do módulo de configurações.
 * 
 * @class   App.controller.bundle.framework.setting.FrameworkController
 * @extends Ext.app.Controller
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.controller.bundle.framework.setting.SettingController',{
    extend: 'Ext.app.Controller',
   
    views: [
        'bundle.framework.setting.SettingModule'
    ],
    
    // objetos referenciados
    refs: [
        {selector: 'settingmodule #btnApply', ref: 'btnApply'},
        {selector: 'settingmodule propertygrid', ref: 'propertyGrid'},
        {selector: 'settingmodule', ref: 'settingModule'}
    ],
    
    /**
     * Registra os controladores dos componentes.
     */
    init : function(){
        this.control({
            // eventos para o grid de proprieades
            'settingmodule propertygrid': {
                // ao editar uma linha
                'edit' : function(){
                    this.getBtnApply().setDisabled(false);
                }
            },
            
            // eventos para o módulo de configurações
            'settingmodule' : {
                // ao renderizar
                'render' : this.loadSettings
                //'activate' : this.loadSettings
            },
            
            'settingmodule #btnApply' : {
                'click' : this.onApplyClick
            }
        })
    },
    
    /**
     * Aciona o salvamento das alterações feitas no grid de propriedades.
     * 
     * @param {Ext.button.Button} btn
     */
    onApplyClick : function(btn){
        var me = this,
            grid = me.getPropertyGrid(),
            data = {};
            
        grid.getStore().each(function(rec){
            data[rec.get('name')] = rec.get('value');
        });    
        
        btn.setLoading(true);
        
        Actions.NetonFramework_Setting.update(data, function(){
            btn.setLoading(false);
            btn.setDisabled(true);
            Neton.Msg.flash({
                type: 'success',
                width: 380,
                msg: 'Configurações atualizadas, recarregue o sistema para efetivá-las!'
            })
        });
        
    },
    
    /**
     * Chama a função remota de recarregamento das propriedades.
     */
    loadSettings : function(){
        var me = this,
            grid = me.getPropertyGrid();
        
        grid.setLoading(true);
        Actions.NetonFramework_Setting.list({},function(r){            
            me.getBtnApply().setDisabled(true);
            grid.setSource(r);
            grid.setLoading(false);
        });
    }
});

