/**
 * Formulário principal do módulo de [module].
 * 
 * @class   App.view.bundle.[bundle].[module].[Module]Form
 * @extends Ext.form.Panel
 * @alias   [module]form
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.view.bundle.[bundle].[module].[Module]Form',{
    extend: 'Ext.form.Panel',
    alias: 'widget.[module]form',
    
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
