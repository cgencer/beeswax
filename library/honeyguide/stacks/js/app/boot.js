module.exports = (function($, _, s, honeyPot) {
    'use strict';

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: boot.js')

            var App = exports.honeyPot.App;
            $('#emberAppArea').appendTo('#queryArea');

        }
    });

})(jQuery, _, s, honeyPot)