/**
 * Interface principal do módulo de bundles.
 * 
 * @class   App.view.framework.bundle.BundleModule
 * @extends Ext.panel.Panel
 * @alias   bundlemodule
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleModule',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.bundlemodule',
   
   requires: [
       'App.view.bundle.framework.bundle.BundleGridToolbar',
       'App.view.bundle.framework.bundle.BundleGrid',
       'App.view.bundle.framework.bundle.BundleFormToolbar',
       'App.view.bundle.framework.bundle.BundleForm',
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
                       xtype: 'bundlegridtoolbar'
                   },                   
                   items: [
                       // grid de bundles
                       {
                           xtype: 'bundlegrid'
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
                       xtype: 'bundleformtoolbar'
                   },                   
                   items: [
                       // formulário de edição
                       {
                           xtype: 'bundleform'
                       }
                   ]
               }               
           ]
        });
        
        me.callParent(arguments);
    }    
});