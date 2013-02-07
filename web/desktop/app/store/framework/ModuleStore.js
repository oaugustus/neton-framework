/**
 * Datastore de módulos.
 * 
 * @class   Proposital.store.ModuleStore
 * @extends Ext.data.Store
 * @author  Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.store.framework.ModuleStore', {
    extend: 'Ext.data.Store',
    model: 'App.model.framework.ModuleModel',
    groupField: 'bundle_name'
});
