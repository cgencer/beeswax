/**
 * Customizer Communicator
 */
(function(exports, $) {
    "use strict";

    var api = wp.customize;
    var OldPreviewer;
    var modusOperandi = false;

    $('button#trigger').on('click', function(e) {
        e.preventDefault();
        return false;
    });

    api.myCustomizerPreviewer = {
        init: function() {
            var self = this;
            this.preview.bind('honeypot', function(data) {
                if ('addPanelButton' === data) {
                    $('button#trigger').on('click', function(e) {
                        e.preventDefault();
                        self.preview.send('honeypot', modusOperandi ? {
                            'panel': 'show',
                            'liner': $(this).parents('li').find('.dbQueryOneLiner').html(),
                            'content': $(this).parents('li').find('.dbQueryPanel').html()
                        } : {
                            'panel': 'hide',
                            'liner': '',
                            'content': ''
                        });
                        modusOperandi = !modusOperandi;
                    });
                }
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



//                    $('body').append($('<div id="slider">Hello World!!</div>'));
//                    $('#slider').slideReveal();

//                $('#customize-theme-controls ul li h3:hasContent(' + data + ')').css('text-decoration', 'underline').css('text-indent', '16px');
//                console.log(data);
