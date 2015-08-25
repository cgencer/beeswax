define('ember-cli-wordpress/serializers/application', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: "ID",

    attrs: {
      categories: { embedded: "always" },
      tags: { embedded: "always" },
      author: { embedded: "always" }
    },

    extractArray: function (store, type, payload) {
      var data = {},
          extracted = [],
          root = Ember['default'].String.pluralize(type.typeKey);

      payload.forEach(function (e) {
        if (typeof e.terms.post_tag !== "undefined") {
          e.tags = e.terms.post_tag;
        }

        if (typeof e.terms.category !== "undefined") {
          e.categories = e.terms.category;
        }

        delete e.terms;
        extracted.push(e);
      });

      data[root] = extracted;

      return this._super(store, type, data);
    },
    extractSingle: function (store, type, payload, id) {
      var data = {},
          root = Ember['default'].String.pluralize(type.typeKey);

      if (typeof payload.terms.post_tag !== "undefined") {
        payload.tags = payload.terms.post_tag;
      }

      if (typeof payload.terms.category !== "undefined") {
        payload.categories = payload.terms.category;
      }

      delete payload.terms;

      data[root] = payload;

      return this._super(store, type, data, id);
    }
  });

});