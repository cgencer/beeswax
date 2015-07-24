(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        console.log('received command');
        if ('boot' === data.cmd) {
            console.log(':::command = boot');

            window.Todos = Ember.Application.create();

            Todos.ApplicationAdapter = DS.LSAdapter.extend({
                namespace: 'todos-emberjs'
            });

        }
    });

})(jQuery);