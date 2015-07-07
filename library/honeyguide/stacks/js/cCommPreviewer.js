/**
 * Customizer Previewer
 */
(function(wp, $) {
    "use strict";

    if (!wp || !wp.customize) {
        return;
    }

    var api = wp.customize;
    var OldPreview;
    var nxtIs;
    api.myCustomizerPreview = {
        init: function() {
            var self = this;
        }
    };

    OldPreview = api.Preview;
    api.Preview = OldPreview.extend({
        initialize: function(params, options) {
            api.myCustomizerPreview.preview = this;
            OldPreview.prototype.initialize.call(this, params, options);
        }
    });

    $(function() {
        api.myCustomizerPreview.init();
    });
})(window.wp, jQuery);