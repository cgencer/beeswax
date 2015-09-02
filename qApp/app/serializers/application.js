import DS from 'ember-data';
import Ember from 'ember';
import rest_serializer from 'app/mixins/serializers/rest';

export default DS.RESTSerializer.extend(rest_serializer, {
  primaryKey: 'ID',
  isNewSerializerAPI: true,

  normalizePayload: function(payload) {
    console.log({ 'posts': payload });
    return { 'posts': payload };
  },
// http://hussfelt.net/2015/08/10/understanding-emberjs-and-jsonapi-2-0/
  normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = payload; 
    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  },
/*
  extractArray: function(store, type, payload, id, requestType) {
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = payload; 
    return this._super(store, type, payloadTemp, id, requestType);
  },

  attrs: {
    items: { embedded: 'always' },
    categories: { embedded: 'always' },
    tags: { embedded: 'always' },
    author: { embedded: 'always' }
  },

  extractArray: function(store, type, payload, id, requestType) {

    var result = {};
    result[ Ember.String.pluralize(type.typeKey) ] = payload.objects;
    payload = result;
    return this._super(store, type, payload, id, requestType);
  },
  extractSingle: function(store, type, payload, id, requestType) {
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = payload; 
    return this._super(store, type, payloadTemp, id, requestType);
    var result = {};
    result[ type.typeKey ] = payload.objects;
    payload = result;
    return this._super(store, type, payload, id, requestType);
  },

  normalizePayload: function(type, payload) {
    return { posts: payload };
  }
*/

});