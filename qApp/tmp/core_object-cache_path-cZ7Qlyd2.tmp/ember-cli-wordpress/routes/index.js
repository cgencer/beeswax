define('ember-cli-wordpress/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function() {
      return this.store.findAll('post');
    }
  });

});