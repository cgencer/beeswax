(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        console.log('received command');
        if ('boot' === data.cmd) {
            console.log(':::command: boot');

            window.Todos = Ember.Application.create({
                rootElement: '#emberArea'
            });
            Todos.deferReadiness();

            Todos.ApplicationAdapter = DS.LSAdapter.extend({
                namespace: 'todos-emberjs'
            });

            lsbridge.send('emberBridge', {
                cmd: 'start'
            });

        }
    });

})(jQuery);