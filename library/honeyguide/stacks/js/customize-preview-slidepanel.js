/**
 * Customizer Previewer SlidePanel
 */
(function(wp, $, _) {
    "use strict";

    if (!wp || !wp.customize) {
        return;
    }

    var api = wp.customize;
    var sRev;
    var OldPreview;

    api.slidePanel = {
        // Init
        init: function() {

            $('body').append($('<div id="slider" class="oneLiners container" style="border-right:1px solid #aaa;">Hello World!!</div>'));
            sRev = $('#slider');

            this.preview.bind('honeypot', function(data) {
                console.log('panel is ' + data.panel + 'ing itself.');
                sRev.slideReveal({
                    autoEscape: true,
                    width: 500,
                    speed: 700
                });
                if (data.panel) {
                    sRev.html(data.content).slideReveal(data.panel)
                    api.slidePanel.createOneLiner(data.liner);
                }
            });

        },
        createOneLiner: function(liner) {
            $(liner).appendTo($(sRev));
            $('body').contents().find('.oneLinerButton').on('click', function(e) {
                if ('-' == $(this).text()) {
                    $(this).parents('.row').remove();
                } else if ('+' == $(this).text()) {
                    api.slidePanel.createOneLiner(liner);
                    $('body').contents().find('.oneLinerButton').removeClass('btn-primary').addClass('btn-danger').text('-');
                    $('body').contents().find('.oneLinerButton:last').removeClass('btn-danger').addClass('btn-primary').text('+');
                }
            });
            $(".dropdown-toggle").dropdown();
            $('body').contents().find('.ddLeft ul li a').on('click', function(e) {
                e.preventDefault();
                $(this).parents('span.dropdown').children('button').text($(this).text() + ' ').append('<span class="caret"></span>');
                if ($(this).hasClass('type_choices')) {
                    alert(_.trim($(this).attr('alt'), '][*+'));
                }
            });
            $('body').contents().find('.ddMid ul li a').on('click', function(e) {
                e.preventDefault();
                $(this).parents('span.dropdown').children('button').text($(this).text() + ' ').append('<span class="caret"></span>');
            });
            $('body').contents().find('.ddRight ul li a').on('click', function(e) {
                e.preventDefault();
                $(this).parents('span.dropdown').children('button').text($(this).text() + ' ').append('<span class="caret"></span>');
            });
        }

    };
    OldPreview = api.Preview;
    api.Preview = OldPreview.extend({
        initialize: function(params, options) {
            api.slidePanel.preview = this;
            OldPreview.prototype.initialize.call(this, params, options);
        }
    });

    $(function() {
        api.slidePanel.init();
    });
})(window.wp, jQuery, _);