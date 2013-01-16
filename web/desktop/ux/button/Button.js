Ext.define('Neton.button.Button',{
    extend: 'Ext.button.Button',
    alias: 'widget.netbutton',
    
    action: '',
    baseCls: '',
    iconColor: 'black',
        
    renderTpl: [
        '<em id="{id}-btnWrap">',
            '<tpl if="href">',
                '<a id="{id}-btnEl" href="{href}" class="{btnCls}" ',
                    '<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl>',
                    '<tpl if="disabled"> disabled="disabled"</tpl>',
                    ' role="link">',
                    '<span id="{id}-btnInnerEl" class="{baseCls}-inner',
                        '<tpl if="childElCls"> {childElCls}</tpl>">',
                        '<tpl if="icon"><i class="icon-{icon} icon-{iconColor}"></i> </tpl>',
                        '{text}',
                    '</span>',
                    '<span id="{id}-btnIconEl" class="{baseCls}-icon {iconCls}',
                        '<tpl if="childElCls"> {childElCls}</tpl>"',
                        '<tpl if="iconUrl"> style="background-image:url({iconUrl})"</tpl>>',
                    '</span>',
                '</a>',
            '<tpl else>',
                '<button id="{id}-btnEl" type="{type}" class="{btnCls}" hidefocus="true"',
                    // the autocomplete="off" is required to prevent Firefox from remembering
                    // the button's disabled state between page reloads.
                    '<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl>',
                    '<tpl if="disabled"> disabled="disabled"</tpl>',
                    ' role="button" autocomplete="off">',
                    '<span id="{id}-btnInnerEl" class="{baseCls}-inner',
                        '<tpl if="childElCls"> {childElCls}</tpl>" style="{innerSpanStyle}">',
                        '<tpl if="icon"><i class="icon-{icon} icon-{iconColor}"></i> </tpl>',
                        '{text}',
                    '</span>',
                    '<span id="{id}-btnIconEl" class="{baseCls}-icon {iconCls}',
                        '<tpl if="childElCls"> {childElCls}</tpl>"',
                        '<tpl if="iconUrl"> style="background-image:url({iconUrl})"</tpl>>',
                    '</span>',
                '</button>',
            '</tpl>',
        '</em>',
        '<tpl if="closable">',
            '<a id="{id}-closeEl" href="#" class="{baseCls}-close-btn" title="{closeText}"></a>',
        '</tpl>'
    ],

getTemplateArgs: function() {
        var me = this,
            persistentPadding = me.getPersistentPadding(),
            innerSpanStyle = '';

        // Create negative margin offsets to counteract persistent button padding if needed
        if (Math.max.apply(Math, persistentPadding) > 0) {
            innerSpanStyle = 'margin:' + Ext.Array.map(persistentPadding, function(pad) {
                return -pad + 'px';
            }).join(' ');
        }

        return {
            href     : me.getHref(),
            disabled : me.disabled,
            hrefTarget: me.hrefTarget,
            type     : me.type,
            btnCls   : me.getBtnCls(),
            splitCls : me.getSplitCls(),
            icon     : me.icon,
            iconColor: me.getIconColor(),
            //iconCls  : me.iconCls,
            text     : me.text || '&#160;',
            tabIndex : me.tabIndex,
            innerSpanStyle: innerSpanStyle
        };
    },
    
    getBtnCls: function() {
        return 'btn btn-' + this.action;
    },
    
    getIconColor: function(){
        var me = this;
        
        switch(me.action){
            case 'default':
            case '':
                return 'black';
            default:
                return  'white';
        }
    }
    
})

