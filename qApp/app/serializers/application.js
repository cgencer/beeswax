import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'ID',
  isNewSerializerAPI: true,
/*
  attrs: {
    items: { embedded: 'always' },
    categories: { embedded: 'always' },
    tags: { embedded: 'always' },
    author: { embedded: 'always' }
  },
*/
  extractArray: function(store, type, payload, id, requestType) {
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = payload; 
    return this._super(store, type, payloadTemp, id, requestType);
/*
    var result = {};
    result[ Ember.String.pluralize(type.typeKey) ] = payload.objects;
    payload = result;
    return this._super(store, type, payload, id, requestType);
*/
  },
  extractSingle: function(store, type, payload, id, requestType) {
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = payload; 
    return this._super(store, type, payloadTemp, id, requestType);
/*
    var result = {};
    result[ type.typeKey ] = payload.objects;
    payload = result;
    return this._super(store, type, payload, id, requestType);
*/
  },

  normalizePayload: function(type, payload) {
    return { posts: payload };
  }

});