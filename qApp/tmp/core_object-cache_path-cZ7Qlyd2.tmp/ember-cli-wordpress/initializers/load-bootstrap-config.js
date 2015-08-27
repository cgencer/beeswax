define('ember-cli-wordpress/initializers/load-bootstrap-config', ['exports', 'ember-cli-wordpress/config/environment', 'ember-bootstrap/config'], function (exports, ENV, Config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(/* container, application */) {
      Config['default'].load(ENV['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };

});