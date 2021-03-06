/**
 * Painel do formulário de edição de bundles
 * 
 * @class   App.view.bundle.framework.bundle.BundleForm
 * @extends Ext.grid.Panel
 * @alias   bundleform
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.framework.bundle.BundleForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.bundleform',
    
    bodyPadding: 5,
    autoScroll: true,
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this,
            required = '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>';
        
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
                            xtype: 'textfield',
                            labelAlign: 'top',
                            width: 400,
                            msgTarget: 'side',
                            allowBlank: false,
                            name: 'title',
                            afterLabelTextTpl: required,
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
                            afterLabelTextTpl: required,
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
                            afterLabelTextTpl: required,
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
