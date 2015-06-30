var honeyPot = (function(honeyPot, wp, $) {
    "use strict";

    if (!wp || !wp.customize || !$) return;
    var api = wp.customize;

    honeyPot.editor = function() {

        // private variables
        var dimensions = {
            width: width,
            height: height
        };

        var me = {};
        me._private = {};

        // private methods
        // creating getWidth and getHeight
        // to prevent access by reference to dimensions
        var getWidth = function() {
            return dimensions.width;
        };
        var getHeight = function() {
            return dimensions.height;
        };

        var init = function() {
            var self = this;
        };

        // public API
        return {
            getWidth: getWidth,
            getHeight: getHeight,
            me: me,
            init: init
        };
    };


}(honeyPot || {}, window.wp, jQuery));
