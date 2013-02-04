/**
 * Toolbar de ajuda dos comandos da aplicação.
 * 
 * @class   Neton.framework.ui.HelpCmdToolbar
 * @extends Ext.toolbar.Toolbar
 * @alisa   netuihelpcmdtoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.HelpCmdToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.netuihelpcmdtoolbar',
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this, ctrl;
        
        // aplica as configurações definidas pela aplicação
        Ext.applyIf(me, me.settings);
        
        if (Ext.isMac){
            ctrl = 'Command'
        } else {
            ctrl = 'Ctrl'
        }
        
        // cria os componentes básicos da toolbar
        Ext.applyIf(me,{
           padding: 5,
           items: [
               {
                   xtype: 'container',
                   html: '<b>'+ctrl+' + S (Salvar)</b>'
               },'-',
               {
                   xtype: 'container',
                   html: '<b>ESC (Voltar)</b>'
               }
           ] 
        });
        
        me.callParent(arguments);        
    }
});



