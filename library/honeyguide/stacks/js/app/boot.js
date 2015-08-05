(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: boot.js')

            $('#emberAppArea').appendTo('#emberArea');
            $('#emberArea').appendTo('#queryArea');

            //            Todos.advanceReadiness();
            //            App.advanceReadiness();
        }
    });

})(jQuery);