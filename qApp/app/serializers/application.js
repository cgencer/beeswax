import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({     //DS.EmbeddedRecordsMixin,{
  primaryKey: 'ID',
  isNewSerializerAPI: true,

  attrs: {
    items: { embedded: 'always' },
    categories: { embedded: 'always' },
    tags: { embedded: 'always' },
    author: { embedded: 'always' }
  },
/*
  extractArray: function(store, type, payload) {
    var payloadTemp = {};
    payloadTemp[type.typeKey] = payload;
    return this._super(store, type, payloadTemp);
  },
*/
  extractArray: function (store, primaryType, payload) {
    var payloadTemp = {}; 
    payloadTemp['post'] = payload; 
    return this._super(store, type, payloadTemp, id); 
  },

  extractSingle: function(store, type, payload, id) { 
    var payloadTemp = {}; 
    payloadTemp[type.typeKey] = [payload]; 
    return this._super(store, type, payloadTemp, id); 
  }

});
