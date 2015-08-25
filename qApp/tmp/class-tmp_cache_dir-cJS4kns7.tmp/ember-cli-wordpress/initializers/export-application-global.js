define('ember-cli-wordpress/initializers/export-application-global', ['exports', 'ember', 'ember-cli-wordpress/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === "string") {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});