/**
 * Interface principal do módulo de teste.
 * 
 * @class   App.view.bundle.setting.teste.TesteModule
 * @extends Ext.panel.Panel
 * @alias   testemodule
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.setting.teste.TesteModule',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.testemodule',
   
   requires: [
       'App.view.bundle.setting.teste.TesteGridToolbar',
       'App.view.bundle.setting.teste.TesteGrid',
       'App.view.bundle.setting.teste.TesteFormToolbar',
       'App.view.bundle.setting.teste.TesteForm',
   ],
   
   // configurações internas
   bodyBorder: false,
   border: false,
   cls: 'module',
   style: 'background-color: #fff;',
   layout: 'card',
   layoutConfig: {
       animate: true
   },
   
   /**
    * Inicializa o componente.
    */
   initComponent : function(){
        var me = this;
        
        Ext.applyIf(me,{
           items: [
               {
                   xtype: 'panel',
                   border: false,
                   bodyBorder: false,
                   layout: 'fit',
                   itemId: 'gridpanel',
                   bodyPadding: 5,
                   // toolbar do grid
                   tbar: {
                       xtype: 'testegridtoolbar'
                   },                   
                   items: [
                       // grid de bundles
                       {
                           xtype: 'testegrid'
                       }
                   ]
               },
               {
                   xtype: 'panel',
                   border: false,
                   bodyBorder: false,
                   layout: 'fit',
                   itemId: 'formpanel',
                   bodyPadding: 5,
                   // toolbar do form
                   tbar: {
                       xtype: 'testeformtoolbar'
                   },                   
                   items: [
                       // formulário de edição
                       {
                           xtype: 'testeform'
                       }
                   ]
               }               
           ]
        });
        
        me.callParent(arguments);
    }    
});