/**
 * Customizer Communicator
 */
(function(exports, $) {
    "use strict";

    var api = wp.customize;
    var OldPreviewer;

    api.myCustomizerPreviewer = {
        init: function() {
            var self = this;
            console.log('init controller');
            this.preview.bind('honeypot', function(data) {
                if ('addPanelButton' === data) {
                    $('#customize-header-actions .primary-actions input#save').after('<button id="trigger" class="button button-primary save">Trigger</button>');
                    $('button#trigger').on('click', function(e) {
                        e.preventDefault();
                        self.preview.send('honeypot', 'openPanel');
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
