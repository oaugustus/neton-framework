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
                	// reservado para o campo id
                    xtype: 'hidden',
                    name: 'id'
                },
                /*<FIELDS/>*/
    		]
    	});
    	
    	me.callParent(arguments);
    }
})
