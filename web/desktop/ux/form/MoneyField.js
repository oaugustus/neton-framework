/**
 * MoneyField
 * @todo    Rewrite this class
 * @class   Ext.ux.form.MoneyField
 * @extends Ext.form.TextField
 * @author  Otávio Fernandes <otavio@neton.com.br>
 */
Ext.define('Neton.form.MoneyField',{
    extend: 'Ext.form.Text',
    alias: 'widget.moneyfield',
    autocomplete: 'off',
    allowNegative: false,
    format: 'BRL',
    currency: 'R$',
    currencyPosition: 'right',
    forceFraction: true,

    onRender:function() {
		var me = this;
		
        // call parent
		me.callParent(arguments);
		
        var name = this.name || this.inputEl.dom.name;
        this.hiddenField = this.inputEl.insertSibling({
             tag:'input'
            ,type:'hidden'
            ,name:name
            ,value:this.convertToNumber(this.value)
        });

        this.hiddenName = name; // otherwise field is not found by BasicForm::findField
        this.inputEl.dom.removeAttribute('name');
        this.inputEl.on({
             keyup:{scope:this, fn:this.updateHidden}
            ,blur:{scope:this, fn:this.updateHidden}
        }, Ext.isIE ? 'after' : 'before');

        this.setValue = Ext.Function.createSequence(this.setValue, this.updateHidden);

    }, // eo function onRender

    convertToNumber : function(v){
      v = new String(v);
      if (v)
        return parseFloat(v.replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.'));
      else
          return '';
    },

    /**
     * Returns the raw value of the field, without performing any normalization, conversion, or validation.
     * To get a normalized and converted value see {@link #getValue}.
     * @return {String} value The raw String value of the field
     */
    getRawValue: function() {        
        var me = this,
            v = (me.inputEl ? me.inputEl.getValue() : Ext.value(me.rawValue, ''));
        me.rawValue = v;
        
        return this.convertToNumber(v);
    },


    /**
     * Sets a data value into the field and runs the change detection and validation. To set the value directly
     * without these inspections see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     * @return {Ext.form.Field} this
     */
    setValue: function(value) {
        if (value){
            value = new String(value);
            value = value.replace('.',',');
            value = this.formatNumber(value, ',', '.');
        }
        
        
        var me = this;
        me.setRawValue(me.valueToRaw(value));
        return me.mixins.field.setValue.call(me, value);
    },


    formatNumber : function (num, decpoint, sep) {
      // check for missing parameters and use defaults if so
      if (arguments.length == 2) {
        sep = ",";
      }
      if (arguments.length == 1) {
        sep = ",";
        decpoint = ".";
      }
      // need a string for operations
      num = num.toString();
      // separate the whole number and the fraction if possible
      a = num.split(decpoint);
      x = a[0]; // decimal
      y = a[1]; // fraction
      z = "";

     if (!y && this.forceFraction) {
         y = '00';
     }

      if (typeof(x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i=x.length-1;i>=0;i--)
          z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
          z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i=z.length-1;i>=0;i--)
          x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof(y) != "undefined" && y.length > 0)
          x += decpoint + y;
      }
      
      return x;
      
    },


    updateHidden:function() {
        this.hiddenField.dom.value = this.convertToNumber(this.getValue());

    }, // eo function updateHidden

    initEvents : function(){
    	var me = this;
    	
        me.callParent(arguments);
        this.el.on("keydown",this.stopEventFunction,this);
        this.el.on("keyup", this.mapCurrency,this);
        this.el.on("keypress", this.stopEventFunction,this);
    },

    KEY_RANGES : {
        numeric: [48, 57],
        padnum: [96, 105]
    },

    isInRange : function(charCode, range) {
        return charCode >= range[0] && charCode <= range[1];
    },

    formatCurrency : function(evt, floatPoint, decimalSep, thousandSep) {
        floatPoint  = !isNaN(floatPoint) ? Math.abs(floatPoint) : 2;
        thousandSep = typeof thousandSep != "string" ? "," : thousandSep;
        decimalSep  = typeof decimalSep != "string" ? "." : decimalSep;
        var key = false;
        if (evt){
            key = evt.getKey();
        }


        if (key && this.isInRange(key, this.KEY_RANGES["padnum"])) {
            key -= 48;
        }

        this.sign = (this.allowNegative && (key == 45 || key == 109)) ? "-" : (key == 43 || key == 107 || key == 16) ? "" : this.sign;

        var character = (this.isInRange(key, this.KEY_RANGES["numeric"]) ? String.fromCharCode(key) : "");
        var field = this.inputEl.dom;
        var value = (field.value.replace(/\D/g, "").replace(/^0+/g, "") + character).replace(/\D/g, "");
        var length = value.length;

        if ( character == "" && length > 0 && key == 8) {
            length--;
            value = value.substr(0,length);
            if (evt)
                evt.stopEvent();
        }

        if(field.maxLength + 1 && length >= field.maxLength) return false;

        length <= floatPoint && (value = new Array(floatPoint - length + 2).join("0") + value);
        for(var i = (length = (value = value.split("")).length) - floatPoint; (i -= 3) > 0; value[i - 1] += thousandSep);
        floatPoint && floatPoint < length && (value[length - ++floatPoint] += decimalSep);
        field.value = (this.showCurrency && this.currencyPosition == 'left' ? this.currency : '' ) +
                                  (this.sign ? this.sign : '') +
                                  value.join("") +
                                  (this.showCurrency && this.currencyPosition != 'left' ? this.currency : '' );
    },

    mapCurrency : function(evt) {
        switch (this.format) {
            case 'BRL':
                this.currency = '';
                this.currencyPosition = 'left';
                this.formatCurrency(evt, 2,',','.');
                break;

            case 'EUR':
                this.currency = ' €';
                this.currencyPosition = 'right';
                this.formatCurrency(evt, 2,',','.');
                break;

            case 'USD':
                this.currencyPosition = 'left';
                this.currency = '$';
                this.formatCurrency(evt, 2);
                break;

            default:
                this.formatCurrency(evt, 2);
        }
    },

        stopEventFunction : function(evt) {
        var key = evt.getKey();

        if (this.isInRange(key, this.KEY_RANGES["padnum"])) {
            key -= 48;
        }

        if ( (( key>=41 && key<=122 ) || key==32 || key==8 || key>186) && (!evt.altKey && !evt.ctrlKey) ) {
                        evt.stopEvent();
                }
        },

        getCharForCode : function(keyCode){
                var chr = '';
                switch(keyCode) {
                        case 48: case 96: // 0 and numpad 0
                                chr = '0';
                                break;

                        case 49: case 97: // 1 and numpad 1
                                chr = '1';
                                break;

                        case 50: case 98: // 2 and numpad 2
                                chr = '2';
                                break;

                        case 51: case 99: // 3 and numpad 3
                                chr = '3';
                                break;

                        case 52: case 100: // 4 and numpad 4
                                chr = '4';
                                break;

                        case 53: case 101: // 5 and numpad 5
                                chr = '5';
                                break;

                        case 54: case 102: // 6 and numpad 6
                                chr = '6';
                                break;

                        case 55: case 103: // 7 and numpad 7
                                chr = '7';
                                break;

                        case 56: case 104: // 8 and numpad 8
                                chr = '8';
                                break;

                        case 57: case 105: // 9 and numpad 9
                                chr = '9';
                                break;

                        case 45: case 189: case 109:
                                chr = '-';
                                break;

                        case 43: case 107: case 187:
                                chr = '+';
                                break;

                        default:
                                chr = String.fromCharCode(keyCode); // key pressed as a lowercase string
                                break;
                }
                return chr;
    }
});