/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {

    var app = new EmberApp({
        'ember-bootstrap': {
            'importBootstrapTheme': true
        },
        'vendorFiles': {
            'handlebars.js': null
        }
    });
    app.import('bower_components/ember-data/ember-data.js');
    app.import('bower_components/ember-data.model-fragments/dist/ember-data.model-fragments.js');
    app.import('bower_components/ember/ember-template-compiler.js');

    return app.toTree();
}