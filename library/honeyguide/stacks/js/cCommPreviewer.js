/**
 * Customizer Previewer
 */
(function(wp, $) {
    "use strict";

    if (!wp || !wp.customize) return;

    var api = wp.customize;
    var OldPreview;

    api.myCustomizerPreview = {
        // Init
        init: function() {
            var self = this; // Store a reference to "this"
            this.preview.bind('active', function() {
                self.preview.send('honeypot', window.myCustomData);
            });
            $('.container section').hover(function() {
                $(this).fadeTo('fast', 0.3);
                $(this).css('border', '1px dotted #c00');
            }, function() {
                $(this).fadeTo('fast', 1);
                $(this).css('border', 'none');
            });

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