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
//    app.import('');
    return app.toTree();
}