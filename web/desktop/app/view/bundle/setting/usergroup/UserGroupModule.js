/**
 * Módulo de grupos de usuários.
 * 
 * @class   App.view.bundle.setting.usergroup.UserGroupModule
 * @extends Ext.panel.Panel
 * @alias   usergroupmodule
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.setting.usergroup.UserGroupModule',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.usergroupmodule',
   
   //title: 'Grupos de usuários',
   bodyBorder: false,
   border: false,
   cls: 'module',
   style: 'background-color: #fff;',
   
   /**
    * Inicializa o componente.
    */
   initComponent : function(){
       var me = this;
       
       Ext.applyIf(me,{
           dockedItems: [
               {
                   xtype: 'toolbar',
                   dock: 'top',
                   padding: 3,
                   style: 'border-bottom: solid 1px #ccc;',
                   items: [
                       {
                           xtype: 'container',
                           items: [
                               {
                                   xtype: 'button',
                                   scale: 'medium',
                                   baseCls: 'red-btn',
                                   text: 'Criar novo grupo'
                               }
                               
                           ]
                       }
                   ]
               }
           ]
       })
       
       me.callParent(arguments);
   }
});
