/**
 * Modelo de bundles.
 * 
 * @class App.model.framework.BundleModel
 * @extends Ext.data.Model
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.model.framework.BundleModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',   type: 'int'},
        {name: 'name',  type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'enabled',  type: 'boolean'},
        {name: 'isDefault', type: 'boolean'},
        {name: 'orderIndex', type: 'int'}
    ],
    proxy: {
        type: 'direct',
        reader: {
            type : 'json',
            root : 'results',
            successProperty: 'success',
            totalProperty: 'total'
        },        
        api: {
            read: Actions.NetonFramework_Bundle.list
        }
    }
});