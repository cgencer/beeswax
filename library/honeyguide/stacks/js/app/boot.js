module.exports = (function($, _, s, honeyPot) {
    'use strict';

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) 
                    console.log('reporting to duty: boot.js')

            var App = exports.honeyPot.App;
            $('#emberAppArea').appendTo('#queryArea');

            App.IndexRoute = Ember.Route.extend({
                model: function() {
                    return [{
                        title: "Top 2 Paula Cole Songs"
                    }, {
                        title: "the other title"
                    }];
                }
            });

        }
    });

})(jQuery, _, s, honeyPot)