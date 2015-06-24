/**
 * Customizer Communicator
 */
(function(exports, $) {
    "use strict";

    var api = wp.customize;
    var OldPreviewer;

    // Custom Customizer Previewer class (attached to the Customize API)
    api.myCustomizerPreviewer = {
        // Init
        init: function() {
            var self = this; // Store a reference to "this" in case callback functions need to reference it
            this.preview.bind('honeypot', function(data) {
                //   alert('"honeypot" has been received from the Previewer. Check the console for the data.');
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