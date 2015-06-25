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
            this.preview.bind('active', function() {});

            $('.container section').hover(function(e) {
                //                alert($(this).position().top + ' x ' + $(this).position().left);

                e.preventDefault();
                self.createMenu(self, $(this));

            });
        },
        createMenu: function(self, stack) {

            $('#editingThisSack, #backingThisSack').remove();
            self.preview.send('honeypot', $(stack).attr('alt'));

            $('#stackEditingContainer').clone().attr('id', 'backingThisSack').appendTo('body').
                css('z-index', 998).
                on('mouseleave', function() {
                    $('#editingThisSack').remove();
                    $(this).remove();
                }).
                width($(stack).width()).
                height($(stack).height()).
                css('top', Math.floor($(stack).offset().top)).
                css('left', Math.floor($(stack).offset().left)).
                css('padding', $(stack).css('padding')).
                css('margin', $(stack).css('margin')).
                css('position', 'absolute').
                css('border', '1px dotted #c00').
                css('background', '#ccc').
                css('opacity', '0.7').
                css('display', 'block');

            $('#stackEditingContainer').clone().attr('id', 'editingThisSack').appendTo('body').
                css('z-index', 999).
                on('mouseleave', function() {
                    $('#backingThisSack').remove();
                    $(this).remove();
                }).
                width($(stack).width()).
                height($(stack).height()).
                css('top', Math.floor($(stack).offset().top)).
                css('left', Math.floor($(stack).offset().left)).
                css('padding', $(stack).css('padding')).
                css('margin', $(stack).css('margin')).
                css('position', 'absolute').
                css('border', '1px dotted #c00').
                css('opacity', '1.0').
                css('display', 'block');

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