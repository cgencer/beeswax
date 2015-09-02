/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'ember-cli-wordpress',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        contentSecurityPolicy: {
            'connect-src': "'self' http://localhost:4200 http://0.0.0.0:4200 http://wplab.dev",
            'script-src': "'self' http://localhost:4200 http://0.0.0.0:4200 http://wplab.dev"
        },
        'ember-devtools': {
            global: true,
            enabled: environment === 'development'
        },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    ENV.wordpress = {
        host: "http://wplab.dev",
        namespace: "wp-json"
    }

    return ENV;
};
