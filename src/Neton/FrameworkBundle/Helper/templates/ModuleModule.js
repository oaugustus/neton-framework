/**
 * Interface principal do módulo de [module].
 * 
 * @class   App.view.[bundle].[module].[Module]Module
 * @extends Ext.panel.Panel
 * @alias   [module]module
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.[bundle].[module].[Module]Module',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.[module]module',
   
   requires: [
       'App.view.bundle.[bundle].[module].[Module]GridToolbar',
       'App.view.bundle.[bundle].[module].[Module]Grid',
       'App.view.bundle.[bundle].[module].[Module]FormToolbar',
       'App.view.bundle.[bundle].[module].[Module]Form',
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
                       xtype: '[module]gridtoolbar'
                   },                   
                   items: [
                       // grid de bundles
                       {
                           xtype: '[module]grid'
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
                       xtype: '[module]formtoolbar'
                   },                   
                   items: [
                       // formulário de edição
                       {
                           xtype: '[module]form'
                       }
                   ]
               }               
           ]
        });
        
        me.callParent(arguments);
    }    
});