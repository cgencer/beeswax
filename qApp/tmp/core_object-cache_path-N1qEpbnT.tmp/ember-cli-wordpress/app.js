define('ember-cli-wordpress/app', ['exports', 'ember', 'ember-data', 'ember/resolver', 'ember/load-initializers', 'ember-cli-wordpress/config/environment'], function (exports, Ember, DS, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  // this should remove CORS errors
  App.ApplicationAdapter = DS['default'].RESTAdapter.extend({
    host: config['default'].wordpress.host,
    ajax: function(url, method, hash) {
      hash.crossDomain = true;
      hash.xhrFields = {withCredentials: true};
      return this._super(url, method, hash);
    }
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});