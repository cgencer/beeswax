define('ember-cli-wordpress/adapters/application', ['exports', 'ember-data', 'ember-cli-wordpress/config/environment'], function (exports, DS, config) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    host: config['default'].wordpress.host,
    namespace: config['default'].wordpress.namespace || 'wp-json'
  });

});