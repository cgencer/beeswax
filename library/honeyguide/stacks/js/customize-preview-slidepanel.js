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
                    sRev.html(data.content).slideReveal(data.panel);
                    api.slidePanel.createOneLiner(sRev, data.liner, data.andor, api.slidePanel.generateUid());
                }
            });

        },
        generateUid: function(separator) {
            var delim = separator || "-";
            delim = "";

            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
        },
        createAndOr: function(sRev, andor, grpid) {
            $(andor).attr('alt', grpid).appendTo($(sRev));
        },
        createOneLiner: function(sRev, liner, andor, grpid) {
            $(liner).attr('alt', grpid).appendTo($(sRev));
            $('body').contents().find('.oneLinerButton').on('click', function(e) {
                if ('-' == $(this).text()) {
                    $('body').contents().find('div[alt="' + $(this).parents('.row').attr('alt') + '"]').remove();
                } else if ('+' == $(this).text()) {
                    api.slidePanel.createAndOr(sRev, andor, grpid);
                    api.slidePanel.createOneLiner(sRev, liner, andor, api.slidePanel.generateUid());
                    $('body').contents().find('.oneLinerButton').removeClass('btn-primary').addClass('btn-danger').text('-');
                    $('body').contents().find('.oneLinerButton:last').removeClass('btn-danger').addClass('btn-primary').text('+');
                }
            });
            $(".dropdown-toggle").dropdown();

            $('body').contents().find('.andor').on('click', function(e) {
                e.preventDefault();
                if ('AND' == $(this).attr('alt')) {
                    $(this).text('OR ').append('<span class="glyphicon glyphicon-link"></span>');
                    $(this).attr('alt', 'OR');
                } else if ('OR' == $(this).attr('alt')) {
                    $(this).text('AND ').append('<span class="glyphicon glyphicon-link"></span>');
                    $(this).attr('alt', 'AND');
                }
            });

            $('iframe').contents().find('.ddLeft ul li a').on('click', function(e) {
                e.preventDefault();
                $(this).parents('span.dropdown').children('button').text($(this).text() + ' ').append('<span class="caret"></span>');
                if ($(this).hasClass('type_choices')) {
                    alert(_.trim($(this).attr('alt'), '][*+'));
                }
            });
            $('iframe').contents().find('.ddMid ul li a').on('click', function(e) {
                e.preventDefault();
                $(this).parents('span.dropdown').children('button').text($(this).text() + ' ').append('<span class="caret"></span>');
            });
            $('iframe').contents().find('.ddRight ul li a').on('click', function(e) {
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