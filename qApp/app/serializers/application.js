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

  extractArray: function (store, type, payload) {
    console.log({posts: payload});
    return this._super(store, type, {
      posts: payload
    }, id);
  },

  extractSingle: function(store, type, payload, id) { 
    return this._super(store, type, {
      posts: payload
    }, id);
  }

});
