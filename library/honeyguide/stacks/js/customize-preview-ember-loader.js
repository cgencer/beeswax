(function($) {
    "use strict";

    var honeyPot = honeyPot || {};

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

            honeyPot.App = Ember.Application.create({
                rootElement: '#emberAppArea'
            });

            honeyPot.App.ApplicationAdapter = honeyPot.LoadFile('./services/adapter.js');
            honeyPot.App.ApplicationSerializer = honeyPot.LoadFile('./services/serializer.js');

            honeyPot.App.Router.map(honeyPot.LoadFile('./routes/router.js'));
            honeyPot.App.IndexRoute = honeyPot.LoadFile('./routes/index.js');
            honeyPot.App.PostRoute = honeyPot.LoadFile('./routes/post.js').extend();
            honeyPot.App.PageRoute = honeyPot.LoadFile('./routes/post.js').extend();
            honeyPot.App.UserRoute = honeyPot.LoadFile('./routes/user.js');
            honeyPot.App.TagRoute = honeyPot.LoadFile('./routes/term.js').extend();
            honeyPot.App.CategoryRoute = honeyPot.LoadFile('./routes/term.js').extend();

            honeyPot.App.Post = require('./models/post.js').extend();
            honeyPot.App.Page = require('./models/post.js').extend();
            honeyPot.App.User = require('./models/user.js');
            honeyPot.App.Tag = require('./models/term.js').extend();
            honeyPot.App.Category = require('./models/term.js').extend();

            honeyPot.App.SinglePostComponent = require('./components/single-post.js');

            honeyPot.App.IndexRoute = Ember.Route.extend({
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