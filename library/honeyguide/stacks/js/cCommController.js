/**
 * Customizer Communicator
 */
(function(exports, $) {
    "use strict";

    var api = wp.customize;
    var OldPreviewer;
    var modusOperandi = false;

    api.myCustomizerPreviewer = {
        init: function() {
            var self = this;
            console.log('init controller');
            api.section.each(function(sct) {
                console.log(sct.id);
                if ('stacks_' === sct.id.substr(0, 7)) {
                    //                    alert(sct.id);
                    // $(sct.container).append("<div id='panel_" + sct.id + "' class='panelContent' style='display:none;'>ADDED</div>");
                }
            });
            this.preview.bind('honeypot', function(data) {
                if ('addPanelButton' === data) {
                    if ($('button#trigger').length == 0) {
                        $('#customize-header-actions .primary-actions input#save').after('<button id="trigger" class="button button-primary save" style="margin-right:5px;">Trigger</button>');
                    }
                    $('button#trigger').on('click', function(e) {
                        e.preventDefault();
                        if (modusOperandi) {
                            console.log('opening');
                            self.preview.send('honeypot', {
                                'panel': 'show',
                                'content': $(this).parents('li').children('.panelContent').html()
                            });
                        } else {
                            console.log('closing');
                            self.preview.send('honeypot', {
                                'panel': 'hide',
                                'content': ''
                            });
                        }
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
