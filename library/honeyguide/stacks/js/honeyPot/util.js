//var exports = module.exports = {};
var honeyPot = exports.honeyPot || {};
_.extend(honeyPot, set);

module.exports = (function($, _, s, honeyPot) {
    'use strict';

    console.log('honeyPot::: util loaded');

    exports.honeyPot = _.extend(honeyPot, {

        createNS: function(namespace) {
            var nsparts = namespace.split(".");
            var parent = honeyPot;

            if (nsparts[0] === "honeyPot") {
                nsparts = nsparts.slice(1);
            }
            for (var i = 0; i < nsparts.length; i++) {
                var partname = nsparts[i];
                if (typeof parent[partname] === "undefined") {
                    parent[partname] = {};
                }
                parent = parent[partname];
            }
            return parent;
        },

        extend: function(destination, source) {
            var toString = Object.prototype.toString;
            var objTest = toString.call({});
            for (var property in source) {
                if (source[property] && objTest == toString.call(source[property])) {
                    destination[property] = destination[property] || {};
                    extend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        }

    });

})(jQuery, _, s, honeyPot)