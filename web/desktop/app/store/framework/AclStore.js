/**
 * Datastore de módulos.
 * 
 * @class   Proposital.store.BundleStore
 * @extends Ext.data.Store
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.store.framework.AclStore', {
    extend: 'Ext.data.Store',
    model: 'App.model.framework.BundleModel',
    remoteSort: true
});
