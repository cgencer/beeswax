/**
 * Customizer Communicator
 */
(function(exports, $) {
    "use strict";

    var api = wp.customize;
    var OldPreviewer;

    api.myCustomizerPreviewer = {
        init: function() {
            var self = this;
            this.preview.bind('honeypot', function(data) {
                $('#customize-theme-controls ul li h3:hasContent(' + data + ')').css('text-decoration', 'underline').css('text-indent', '16px');
                console.log(data);
            });
        }
    };

    OldPreviewer = api.Previewer;
    api.Previewer = OldPreviewer.extend({
        initialize: function(params, options) {
            api.myCustomizerPreviewer.preview = this;
            OldPreviewer.prototype.initialize.call(this, params, options);
        }
    });

    $(function() {
        api.myCustomizerPreviewer.init();
    });
})(wp, jQuery);