/**
 * Flash Message Component.
 * 
 * Show an animated flash message.
 * 
 * @class   Netui.window.Flash
 * @extends Ext.window.Window
 * @author  Otávio Fernandes <otavio@neton.com.br>
 */
Ext.define('Neton.window.Flash',{
   extend: 'Ext.window.Window',
   alias: 'widget.netui-msgflash',
   
   /**
    * @cfg {String} type
    * <p>The message type.</p>
    * <li>error: a red message box showing an error message.</li>
    * <li>info: a info message box showing an information message.</li>
    * <li>success: a green message box showing a success message.</li>
    * <li>warning: a yellow message box showing a warning message.</li>
    */
   type: 'success',
   
   /**
    * @cfg {Boolean} autoHide
    * If the message window will be hided automatically
    */
   autoHide: true,
   
   /**
    * @cfg {Number} autoHideSleep
    * Number of seconds to wait before auto hide the message.
    */
   autoHideSleep: 5,
   
   width: 400,
   maxWidth: 500,
   baseCls: 'netui-flash',
   closable: false,
   bodyPadding: 5,
   shadow: false,
   resizable: false,   
   layout: {
       type: 'hbox',
       align: 'middle'
   },
   
   // initialize the component
   initComponent : function(){
       var me = this;
       
       me.cls = me.type;
       
       me.items = [
           {
               xtype: 'container',
               flex: 1,
               cls: 'text '+ me.type+ '-text',
               style: 'margin-left: 5px;',
               html: me.msg
           }, 
           {
               xtype: 'container',
               width: 20,
               cls: 'close',
               itemId: 'ct-close',
               html: 'x'
           }
       ]
                            
       me.callParent(arguments);              
       
       me.registerEvents();       
   },
    
   // register event handlers
   registerEvents : function(){
       var me = this;
       
       // show handler
       me.on('show', function(){
           me.el.hide();
           me.alignTo(Ext.getBody(), 't-t');
           me.el.slideIn('t', {
                easing: 'easeOut',
                duration: 200
           });
           
           me.el.show();
           
           if (me.autoHide){
               me.autoClose.delay(me.autoHideSleep*1000);
           }

            var esc = new Ext.util.KeyMap(Ext.getBody(), [{
               key: Ext.EventObject.ESC,
               defaultEventAction: 'preventDefault',
               scope: this,
               fn: function(){
                   me.closeFlash();
               }
            }]);                               

           if (me.onShow)
               me.onShow();
       },this);
       
       
       
       // auto hide task
       if (me.autoHide){
           me.autoClose = new Ext.util.DelayedTask(function(){
              me.closeFlash();
           });
       }       
   },
   
   // custom render handler
   afterRender : function(){
       var me = this;
              
       me.callParent(arguments);
       
       me.down('#ct-close').el.on('click', function(){
           this.closeFlash();
       },this);
       
   },
   
   // close the flash message
   closeFlash : function(){
       var me = this;
       this.el.slideOut('t', {
            easing: 'easeOut',
            duration: 200,
            callback : function(){
               if (me.callback)
                    me.callback();                
            },
            scope: me.scope
       });
   }
});

/**
 * Message box component.
 * 
 * @class   Neton.window.Flash
 * @author  Otávio Fernandes <otavio@neton.com.br>
 */
Ext.define('Neton.window.MessageBox', {
    
    /**
     * Show a flash message box.
     * 
     * @param {Object} cfg
     */
    flash : function(cfg){
        Ext.widget('netui-msgflash',cfg).show();
    }
    
}, function(){
    Neton.MessageBox = Neton.Msg = new this();    
})