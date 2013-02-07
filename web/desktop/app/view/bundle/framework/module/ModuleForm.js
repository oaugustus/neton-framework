/**
 * Painel do formulário de edição de módulos
 * 
 * @class   App.view.bundle.framework.module.ModuleForm
 * @extends Ext.grid.Panel
 * @alias   moduleform
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.module.ModuleForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
    
    bodyPadding: 5,
    autoScroll: true,
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        Ext.applyIf(me, {
            bbar: {
                xtype: 'netuihelpcmdtoolbar'
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'id'
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 400,
                            msgTarget: 'side',
                            allowBlank: false,
                            name: 'title',
                            fieldLabel: '<b>Aplicação</b>'
                        }                        
                    ]
                },                
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            width: 400,
                            msgTarget: 'side',
                            allowBlank: false,
                            name: 'title',
                            fieldLabel: '<b>Nome</b>'
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            width: 400,
                            msgTarget: 'side',
                            name: 'name',
                            allowBlank: false,
                            fieldLabel: '<b>Classe</b> (xtype ExtJS)'
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            width: 200,
                            msgTarget: 'side',
                            name: 'iconCls',
                            allowBlank: false,
                            fieldLabel: '<b>Ícone</b> (classe CSS)'
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '<b>Habilitado</b>',
                            columns: 2,
                            labelAlign: 'top',
                            width: 150,
                            items: [
                                { boxLabel: 'Sim', name: 'enabled', inputValue: '1', checked: true},
                                { boxLabel: 'Não', name: 'enabled', inputValue: '0' }
                            ]
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '<b>Default</b>',
                            columns: 2,
                            labelAlign: 'top',
                            width: 150,
                            items: [
                                { boxLabel: 'Sim', name: 'isDefault', inputValue: '1'},
                                { boxLabel: 'Não', name: 'isDefault', inputValue: '0',checked: true }
                            ]
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'n-field-ct',
                    items: [
                        {
                            xtype: 'numberfield',
                            labelAlign: 'top',
                            width: 150,
                            name: 'orderIndex',
                            fieldLabel: '<b>Ordem de exibição</b>'
                        }                
                        
                    ]
                }                
            ]
        });
        
        
        me.callParent(arguments);
                
    }

});
