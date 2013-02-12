/**
 * Combobox que carrega o datastore automaticamente quando for setado o seu 
 * valor e seu datastore ainda não estiver carregado.
 * 
 * @class   Neton.form.Combo
 * @extends Ext.form.ComboBox
 * @author  Otávio Fernandes
 */
Ext.define('Neton.form.ComboBox',{
    extend: 'Ext.form.ComboBox',
    alias: 'widget.netoncombo',
    
    initComponent : function(){
    	var me = this;
    	
    	Ext.applyIf(me, {
		    multiSelect: false
    	});
    	
    	me.callParent(arguments);
    },
    
    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     * @return {Ext.form.Field} this
     */
    setValue : function(v){
        var text = v;

        if (typeof v!= 'object'){
            if(this.valueField){
                var r = this.findRecord(this.valueField, v);
                if(r){
                    text = r.data[this.displayField];
                }else {
                    //console.log(v);
                    this.loadRecord(this.valueField, v);
                }
            }
            
            this.callParent(arguments);
        }else{
            return this.callParent(arguments);
        }
    },

    /**
     * Loads datastore with the record value.
     * @todo rewrite this method
     */
    loadRecord : function(prop, value){
        if ('' != value && undefined != value){

            this.store.load({
                params:{
                    //fields:[prop],
                    searchId: value
                },
                callback : function(){
                    
                    var index = this.store.find(this.valueField, value),
                    rec = this.store.getAt(index);
                    //console.log(rec);
                    
                    if (rec){
                        this.setValue(rec.data[this.valueField]);
                    }else if(Ext.isDefined(this.valueNotFoundText)){
                        Neton.ux.form.ComboBox.superclass.setValue.call(this, value);
                    }
                },
                scope: this
            });

        }
    }

});
