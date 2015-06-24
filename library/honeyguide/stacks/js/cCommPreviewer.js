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
            $('.container section').hover(function(e) {
                //                alert($(this).position().top + ' x ' + $(this).position().left);

                e.preventDefault();
                $('<div id="stackUpPoop" />').appendTo($('body'));

                $('#stackUpPoop').
                    css('z-index', 999).
                    width($(this).width()).
                    height($(this).height()).
                    css('top', Math.floor($(this).offset().top)).
                    css('left', Math.floor($(this).offset().left)).
                    css('padding', $(this).css('padding')).
                    css('margin', $(this).css('margin')).
                    css('position', 'absolute').
                    css('background', '#ccc').
                    css('border', '1px dotted #c00').
                    css('opacity', '0.7');

                $('#stackEditingContainer').clone().appendTo('#stackUpPoop');

            }, function() {
                $('#stackUpPoop').remove();
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