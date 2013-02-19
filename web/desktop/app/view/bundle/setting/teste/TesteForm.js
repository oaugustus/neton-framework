/**
 * Formulário principal do módulo de teste.
 * 
 * @class   App.view.bundle.setting.teste.TesteForm
 * @extends Ext.form.Panel
 * @alias   testeform
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.setting.teste.TesteForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.testeform',
    
    bodyPadding: 5,
    autoScroll: true,
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
    	var me = this;
    	
    	Ext.applyIf(me, {
            bbar: {
            	// toolbar que exibe os atalhos de teclado
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
							xtype: 'numberfield',
							width: 200,
							allowDecimals: false,
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: false,
							afterLabelTextTpl: App.requiredField,
							fieldLabel: '<b>IntField</b>',
							name: 'intField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'moneyfield',
							width: 200,
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>MoneyField</b>',
							name: 'moneyField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'numberfield',
							width: 200,
							hideTrigger: true,
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>FloatField</b>',
							name: 'floatField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'textfield',
							width: 400,
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: false,
							afterLabelTextTpl: App.requiredField,
							fieldLabel: '<b>TextField</b>',
							name: 'textField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'radiogroup',
							columns: 2,
							labelAlign: 'top',
							width: 150,
							fieldLabel: '<b>RadioField</b>',
							items: [
								{name: 'radioField', boxLabel: 'Sim', inputValue: '1', checked: true},
								{name: 'radioField', boxLabel: 'Não', inputValue: '0'}
							]

						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'textarea',
							width: 400,
							height: 100,
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>TextareaField</b>',
							name: 'textareaField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'timefield',
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>TimeField</b>',
							name: 'timeField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'datefield',
							labelAlign: 'top',
							msgTarget: 'side',
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>DateField</b>',
							name: 'dateField'
						}
					]
				},
				{
					xtype: 'container',
					cls: 'n-field-ct',
					items: [
						{
							xtype: 'netoncombo',
							width: 400,
							labelAlign: 'top',
							msgTarget: 'side',
							plugins: ["clearbutton"],
							allowBlank: true,
							afterLabelTextTpl: '',
							fieldLabel: '<b>Test</b>',
							name: 'test',
							displayField: 'id',
							valueField: 'id'
						}
					]
				}
    		]
    	});
    	
    	me.callParent(arguments);
    }
})
