/**
 * Modelo de módulos.
 * 
 * @class App.model.framework.ModuleModel
 * @extends Ext.data.Model
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
Ext.define('App.model.framework.ModuleModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',   type: 'int'},
        {name: 'name',  type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'bundle_name', type: 'string'},
        {name: 'remoteController', type: 'string'},
        {name: 'entity', type: 'string'},
        {name: 'bundle',   type: 'int'},
        {name: 'enabled',  type: 'boolean'},
        {name: 'spacer',  type: 'boolean'},
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
            read: Actions.NetonFramework_Module.list
        }
    }
});