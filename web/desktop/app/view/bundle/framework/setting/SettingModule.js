/**
 * Interface principal do módulo de configurações do framework.
 * 
 * @class   App.view.framework.setting.SettingModule
 * @extends Ext.panel.Panel
 * @alias   settingmodule
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.setting.SettingModule',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.settingmodule',
    
   // configurações internas
   bodyBorder: false,
   border: false,
   cls: 'module',
   style: 'background-color: #fff;',
   layout: 'hbox',
   bodyPadding: 5,
    
   /**
    * Inicializa o componente.
    */
   initComponent : function(){
        var me = this;
        
        Ext.applyIf(me,{
           // toolbar do módulo
           tbar: this.getToolbar(),
           items: [
               // grid de configurações
               this.getPropertyGrid(),
               
               // auto-fill
               {
                   xtype: 'container',
                   flex: 2
               }
           ]
        });
        
        me.callParent(arguments);
    },
    
    /**
     * Retorna o grid de configuração de propriedades.
     * 
     * @return {Object}
     */
    getPropertyGrid : function(){
        return  {
           xtype: 'propertygrid',
           flex: 2,
           sortableColumns: false,
           listeners : {
                beforerender : function(grid) {
                    var cols = this.getView().getHeaderCt().getGridColumns();
                    
                    cols[0].setText("Configuração");
                    cols[1].setText("Valor");
                }
           },
           nameColumnWidth: 350,
           sourceConfig: this.getSourceConfig(),                   
           source: {
               "moduleContainerType": 'tabpanel',
               'appName': 'NetonFramework Application'
           }
       }

    },
    
    /**
     * Recupera o objeto de configuração do grid de propriedades.
     * 
     * @return {Object}
     */
    getSourceConfig : function(){
        return {
            showLogo: this.getShowLogoConfig(),
            moduleContainerType: this.getModuleContainerTypeConfig(),
            appName: this.getAppNameConfig()
        }
    },
    
    /**
     * Retorna a configuração da propriedade showLogo.
     * 
     * @return {Object}
     */
    getShowLogoConfig : function(){
        return {
            displayName: 'Geral - Mostrar logomarca',
            type: 'boolean'
        }
    },
        
    /**
     * Retorna a configuração da propriedade nome da aplicação.
     * 
     * @return {Object}
     */
    getAppNameConfig : function(){
        return {
            displayName: 'Geral - Nome da aplicação',
            type: 'string',
            editor: Ext.create('Ext.form.field.Text',{
                allowBlank: false
            })
        }
    },
    
    /**
     * Retorna a configuração da propriedade moduleContainerType.
     * 
     * @return {Object}
     */
    getModuleContainerTypeConfig : function(){
        return {                           
            type: 'string',
            displayName: 'UI - Tipo do container de módulos',
            editor: Ext.create('Ext.form.ComboBox',{
                editable: false,
                store: Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data : [
                        {"name":"tabpanel"},
                        {"name":"panel"}
                    ]
                }),
                displayField: 'name',
                valueField: 'name'             
            })                            
        }

    },
    
    /**
     * Retorna a toolbar do módulo de configurações.
     * 
     * @return {Array}
     */
    getToolbar : function(){
        return [
           {
               xtype: 'container',
               items: [
                   {
                       xtype: 'button',
                       baseCls: 'blue-btn',
                       itemId: 'btnApply',
                       scale: 'medium',
                       text: 'Aplicar alterações'
                   }
               ]
           }            
        ]
    }
});


