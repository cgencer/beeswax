(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: app.js')

            Todos.advanceReadiness();
            App.advanceReadiness();
            $('#emberAppArea').appendTo('#emberArea');
            $('#emberArea').appendTo('#queryArea');
        }
    });

})(jQuery);