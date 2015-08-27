define('ember-cli-wordpress/router', ['exports', 'ember', 'ember-cli-wordpress/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function() {
    this.route("post", {
      path: "/post/:post"
    });
  });

  exports['default'] = Router;

});