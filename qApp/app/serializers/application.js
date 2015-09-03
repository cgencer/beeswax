import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  primaryKey: 'ID',
  isNewSerializerAPI: true,

 // http://hussfelt.net/2015/08/10/understanding-emberjs-and-jsonapi-2-0/
  normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
    var payloadTemp = {};
    payloadTemp[ Ember.String.pluralize(primaryModelClass.modelName) ] = payload;
//console.log('arrayResponse');
//console.dir(payloadTemp);
    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  },

  normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
    var payloadTemp = {};
    payloadTemp[ primaryModelClass.modelName ] = payload;
    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  },

/*
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
    var payloadTemp = {};
    payloadTemp[ primaryModelClass.modelName ] = payload;
console.log('normalizeResponse');
console.log(payloadTemp);
    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  }
*/
});