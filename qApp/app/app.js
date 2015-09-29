import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  imports: {
//    Handlebars: Handlebars,
//    jQuery: $,
    console: window.console
  },
  LOG_TRANSITIONS_INTERNAL:  false,
  LOG_ACTIVE_GENERATION:     true,
  LOG_VIEW_LOOKUPS:          true,
  LOG_RESOLVER:              false
});

Ember.RSVP.configure('onerror', function(error) {
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

loadInitializers(App, config.modulePrefix);

Ember.run.backburner.DEBUG            = true;
Ember.ENV.RAISE_ON_DEPRECATION        = true;
Ember.LOG_STACKTRACE_ON_DEPRECATION   = true;
Ember.LOG_BINDINGS                    = true;
Ember.RSVP.on('error', function(error) {
  Ember.Logger.assert(false, error);
});

export default App;
