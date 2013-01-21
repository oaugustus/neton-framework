/**
 * Toolbar da lista de bundles da aplicação.
 * 
 * @class   Neton.framework.ui.BundleToolbar
 * @extends Ext.toolbar.Toolbar
 * @alisa   netuibundletoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.BundleToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.netuibundletoolbar',

    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        // aplica as configurações definidas pela aplicação
        Ext.applyIf(me, me.settings);
        
        // cria os componentes básicos da toolbar
        Ext.applyIf(me,{
           cls: 'bundle-toolbar',
           items: [
               /*{
                   text: 'Dashboard',
                   pressed: true,
                   enableToggle: true,
                   iconCls: 'dashboard-icon',
                   scale: 'large',
                   toggleGroup: 'bundle',
                   iconAlign: 'top'
               },'-',
               {
                   text: 'Configurações',
                   iconCls: 'setting-icon',
                   scale: 'large',
                   enableToggle: true,
                   toggleGroup: 'bundle',
                   iconAlign: 'top'
               }
               */
           ] 
        });
        
        me.callParent(arguments);
        
        me.addEvents(
            /**
             * @event beforeexit
             * Acionado antes de chamar a função remota de logout mas depois do logout ter sido confirmado.
             * 
             * @param {Ext.button.Button} btnExit
             */ 
            'beforeexit',
            /**
             * @event exit
             * Acionado após o retorno da função remota de logout.
             */ 
            'exit'            
        );
    }
});



