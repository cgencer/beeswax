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
                self.createMenu($(this));

            });
        },
        createMenu: function(stack) {

            $('#stackEditingContainer').clone().attr('id', 'editingThisSack').appendTo('body').
                css('z-index', 999).
                on('mouseleave', function() {
                    $(this).remove();
                }).
                width($(stack).width()).
                height($(stack).height()).
                css('top', Math.floor($(stack).offset().top)).
                css('left', Math.floor($(stack).offset().left)).
                css('padding', $(stack).css('padding')).
                css('margin', $(stack).css('margin')).
                css('position', 'absolute').
                css('background', '#ccc').
                css('border', '1px dotted #c00').
                css('display', 'block').
                css('opacity', '0.7');

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