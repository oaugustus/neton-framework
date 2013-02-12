/**
 * Interface principal do módulo de módulos.
 * 
 * @class   App.view.framework.module.ModuleModule
 * @extends Ext.panel.Panel
 * @alias   bundlemodule
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.module.ModuleModule',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.modulemodule',
   
   requires: [
       'App.view.bundle.framework.module.ModuleGridToolbar',
       'App.view.bundle.framework.module.ModuleGrid',
       'App.view.bundle.framework.module.ModuleFormToolbar',
       'App.view.bundle.framework.module.ModuleForm',
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
                       xtype: 'modulegridtoolbar'
                   },                   
                   items: [
                       // grid de bundles
                       {
                           xtype: 'modulegrid'
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
                       xtype: 'moduleformtoolbar'
                   },                   
                   items: [
	                   	{
	                   		xtype: 'tabpanel',
	                   		items: [
		                       // formulário de edição
		                       {
		                           xtype: 'moduleform'
		                       },
		                       {
		                       		xtype: 'panel',
		                       		title: 'Interface'
		                       }	                   		
	                   		]
	                   	}
                   ]
               }               
           ]
        });
        
        me.callParent(arguments);
    }    
});