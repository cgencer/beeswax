define('ember-cli-wordpress/routes/post', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function(params) {

      var type = this.routeName;

      return this.store.findAll(type, {
        filter: {
          name: params[type]
        }
      });
    }
  });

});