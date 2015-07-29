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

            window.App = Ember.Application.create({
                rootElement: '#emberAppArea'
            });
            App.deferReadiness();

            App.IndexRoute = Ember.Route.extend({
                model: function() {
                    return [
                        {
                            id: 1,
                            firstName: 'Tom',
                            lastName: 'Dale',
                            twitterUserName: 'tomdale',
                            text: 'I think we should back old Tomster. He was awesome.',
                            timeStamp: Date.now() - 400000,
                        },
                        {
                            id: 2,
                            firstName: 'Yehuda',
                            lastName: 'Katz',
                            twitterUserName: 'wycats',
                            text: 'That\'s a good idea.',
                            timeStamp: Date.now() - 300000,
                        }
                    ];
                }
            });

            Ember.Handlebars.helper('format-date', function(date) {
                return moment(date).fromNow();
            });

            lsbridge.send('emberBridge', {
                cmd: 'start'
            });
        }
    });

})(jQuery);