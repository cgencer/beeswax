/**
 * Customizer Previewer SlidePanel
 */
(function(wp, $) {
    "use strict";

    if (!wp || !wp.customize) return;

    var api = wp.customize;
    var OldPreview;

    api.slidePanel = {
        // Init
        init: function() {

            jQuery(document).ready(function($) {
                $('body').append($('<div id="slider">Hello World!!</div>'));
                $('#slider').slideReveal();
            });
        },

    };

    $(function() {
        api.slidePanel.init();
    });
})(window.wp, jQuery);