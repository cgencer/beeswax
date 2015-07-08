/**
 * Customizer Previewer SlidePanel
 */
(function(wp, $) {
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
                $(function() {
                    if (data.panel && data.content) {
                        sRev.html(data.content).slideReveal(data.panel)
                        api.slidePanel.createOneLiner(data.liner);
                    }
                });
            });

        },
        createOneLiner: function(liner) {
            $(liner).appendTo($(sRev));

            $('body').contents().find('#slider .oneLinerButton').last().on('click', function(e) {
                alert($(this).attr('id') + ' has been clicked.');
                this.slidePanel.createOneLiner();
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
})(window.wp, jQuery);