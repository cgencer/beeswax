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
    api.stackMenus = {
        init: function() {
            var self = this;

            $('.container section').hover(function(e) {
                e.preventDefault();
                self.createMenu(self, $(this));
                self.editingMode(self, $, $(this));
            });
        },
        editingMode: function(self, $, stack) {
            var uid = self.generateUid();
            var uided = 'stack_' + uid;
            if (!$(stack).hasClass('stacks')) {
                $(stack).addClass('stacks').addClass(uided);
                self.editingStack = uided;
            }

            $('.' + uided + ' .editable_textfield').css('border', '1 px dashed #cc0000');
        },
        generateUid: function(separator) {
            var delim = separator || "-";
            delim = "";

            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
        },
        createMenu: function(self, stack) {

            $('#editingThisSack, #backingThisSack').remove();

            self.preview.send('honeypot', 'addPanelButton');

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
            api.stackMenus.preview = this;
            OldPreview.prototype.initialize.call(this, params, options);
        }
    });

    $(function() {
        api.stackMenus.init();
    });
})(window.wp, jQuery);