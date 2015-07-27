(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        console.log('received command');
        if ('start' === data.cmd) {
            console.log('reporting to duty: app.js')

            Todos.advanceReadiness();
        }
    });

})(jQuery);