honeyPot.editor = (function($, wp, honeyPot) {
    "use strict";

    if (!wp || !wp.customize || !$) return;
    var api = wp.customize;
    var self = Object.create(honeyPot);

    self.init = function() {
        var self = this;
        //        alert('init');
    };

    $(function() {
        self.init();
    });

    return self;

}(jQuery, window.wp, honeyPot || {}));
