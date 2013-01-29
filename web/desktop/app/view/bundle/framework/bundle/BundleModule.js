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
       'App.view.bundle.framework.bundle.BundleToolbar',
       'App.view.bundle.framework.bundle.BundleGrid'
   ],
   
   // configurações internas
   bodyBorder: false,
   border: false,
   cls: 'module',
   style: 'background-color: #fff;',
   layout: 'card',
   
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
                   bodyPadding: 5,
                   // toolbar do grid
                   tbar: {
                       xtype: 'bundletoolbar'
                   },                   
                   items: [
                       // grid de configurações
                       {
                           xtype: 'bundlegrid'
                       }
                   ]
               }
           ]
        });
        
        me.callParent(arguments);
    }    
});