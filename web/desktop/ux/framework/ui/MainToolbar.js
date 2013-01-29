/**
 * Toolbar principal da aplicação
 * 
 * @class   Neton.framework.ui.MainToolbar
 * @extends Ext.toolbar.Toolbar
 * @alisa   netuimaintoolbar
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('Neton.framework.ui.MainToolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.netuimaintoolbar',

    /**
     * @cfg {Boolean} showTitle
     * Se o título na barra principal será ou não exibido.
     */    
    showTitle: true,
    
    /**
     * @cfg {Boolean} showLogo
     * Se a logomarca será ou não exibida.
     */    
    showLogo: true,
    
    /**
     * @cfg {Int} logoWidth
     * Largura da logo.
     */    
    logoWidth: 50,
    
    /**
     * @cfg {Int} logoHeight
     * Altura da logo.
     */    
    logoHeight: 50, 
    
    /**
     * @cfg {Boolean} showAvatar
     * Se a o avatar do usuário será ou não exibido.
     */    
    showAvatar: true,    

    /**
     * @cfg {String} exitText
     * Texto do botão exit.
     */    
    exitText: 'Sair',    

    /**
     * @cfg {String} exitTitle
     * Título da janela de confirmação de logout.
     */    
    exitTitle: 'ATENÇÃO',    

    /**
     * @cfg {String} exitMsg
     * Mensagem da janela de confirmação de logout.
     */    
    exitMsg: 'Deseja realmente sair do sistema?',    

    /**
     * @cfg {Function} logoutFn
     * Função direct de logout do sistema.
     */    
    logoutFn: Actions.NetonFramework_Security.logout,    
    
    /**
     * Inicializa o componente.
     */
    initComponent : function(){
        var me = this;
        
        // aplica as configurações definidas pela aplicação
        Ext.apply(me, me.settings);
        
        // cria os componentes básicos da toolbar
        Ext.applyIf(me,{
           cls: 'app-toolbar',
           items: [
               me.getLogo(),
               me.getTitle(),
               '->',
               me.getAvatar(),
               me.getUserInfo(),
               '-',
               me.getExitButton()
           ] 
        });
        
        me.callParent(arguments);
        
        me.addEvents(
            /**
             * @event beforeexit
             * Acionado antes de chamar a função remota de logout mas depois do logout ter sido confirmado.
             * 
             * @param {Ext.button.Button} btnExit
             */ 
            'beforeexit',
            /**
             * @event exit
             * Acionado após o retorno da função remota de logout.
             */ 
            'exit'            
        );
    },
    
    /**
     * Recupera a logomarca do sistema.
     * 
     * @return {Object/undefined}
     */
    getLogo : function(){
        var me = this;
        
        if (me.showLogo){
            return {
                xtype: 'image',
                src: APP.webpath + '/resources/img/logo.png',
                width: me.logoWidth,
                height: me.logoHeight            
            }            
        }
    },
    
    /**
     * Retorna o título da aplicação.
     * 
     * @return {Object/undefined}
     */
    getTitle : function(){
        var me = this;
        
        if (me.showTitle){
            return {
                xtype: 'container',
                html: '<h1>' + APP.title + '</h1>'
            }
        }
    },
    
    /**
     * Retorna o botão exit da aplicação.
     * 
     * @return {Object}
     */
    getExitButton : function(){
        var me = this;
        
        return {
            text: me.exitText,
            scale: 'medium',
            iconCls: 'exit-icon',
            scope: me,
            handler: me.onExitClick
        }
    },
    
    /**
     * Recupera o componente de exibição do avatar do usuário.
     * 
     * @return {Object/undefined}
     */
    getAvatar : function(){
        var me = this;
        
        if (me.showAvatar){
            return {
                xtype: 'image',
                cls: 'user-avatar'
            }            
        }
    },

    /**
     * Recupera a informação de identificação do usuário.
     * 
     * @return {Object}
     */
    getUserInfo : function(){
        var me = this;
        
        return {
            xtype: 'container',
            itemId: 'ctUserInfo',
            cls: 'user-info'
        }            
    },

    /**
     * Aciona a função de sair do sistema.
     * 
     * Chama o método remoto de logout do usuário.
     * 
     * @param {Ext.button.Button} button
     */
    onExitClick : function(button){
        var me = this;
        
        // exibe mensagem de confirmação de saída do sistema
        Ext.Msg.confirm(me.exitTitle, me.exitMsg, function(btn){
            if ('yes' == btn){
                
                // aciona o evento beforeexit
                me.fireEvent('beforeexit',button);
                
                // cria a máscara de carregamento no botão
                button.setLoading({
                    msg: '...',
                    width: button.getWidth()-5
                });

                me.logoutFn({}, function(url){
                    // aciona o evento exit
                    me.fireEvent('exit');
                    
                    // redireciona para o acesso público
                    self.location = url;
                }, me)
            }
        },this);
    }
});

