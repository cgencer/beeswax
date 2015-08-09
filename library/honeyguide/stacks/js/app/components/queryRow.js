module.exports = (function($, _, s, honeyPot) {
    'use strict';

    var App = exports.honeyPot.App;
    App.QueryRowComponent = Ember.Component.extend({

        queryData: [],
        order: 0,
        actions: {}
    });

})(jQuery, _, s, honeyPot)