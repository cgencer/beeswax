(function($) {
    "use strict";

    lsbridge.subscribe('emberBridge', function(data) {
        console.log('received command');
        if ('boot' === data.cmd) {
            console.log(':::command = boot');

            // TODOS init olmadan diğer script'ler ona attach olmaya çalışıyor.

            window.Todos = Ember.Application.create({
                rootElement: '#emberArea'
            });

            Todos.ApplicationAdapter = DS.LSAdapter.extend({
                namespace: 'todos-emberjs'
            });

        }
    });

})(jQuery);