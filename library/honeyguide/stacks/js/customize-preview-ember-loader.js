module.exports = (function($, _, s, honeyPot) {
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

            var App = Ember.Application.create({
                rootElement: '#emberAppArea'
            });
            /*
                        App.ApplicationAdapter = honeyPot.LoadFile('./services/adapter.js'),
                        App.ApplicationSerializer = honeyPot.LoadFile('./services/serializer.js'),

                        App.Router.map(honeyPot.LoadFile('./routes/router.js'));
                        App.IndexRoute = honeyPot.LoadFile('./routes/index.js');
                        App.PostRoute = honeyPot.LoadFile('./routes/post.js').extend();
                        App.PageRoute = honeyPot.LoadFile('./routes/post.js').extend();
                        App.UserRoute = honeyPot.LoadFile('./routes/user.js');
                        App.TagRoute = honeyPot.LoadFile('./routes/term.js').extend();
                        App.CategoryRoute = honeyPot.LoadFile('./routes/term.js').extend();

                        App.Post = honeyPot.LoadFile('./models/post.js').extend();
                        App.Page = honeyPot.LoadFile('./models/post.js').extend();
                        App.User = honeyPot.LoadFile('./models/user.js');
                        App.Tag = honeyPot.LoadFile('./models/term.js').extend();
                        App.Category = honeyPot.LoadFile('./models/term.js').extend();

                        App.SinglePostComponent = honeyPot.LoadFile('./components/single-post.js');
            */
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
                moment = window.moment;
                return moment(date).fromNow();
            });

            exports.honeyPot = _.extend(honeyPot, {
                App: App
            });

            lsbridge.send('emberBridge', {
                cmd: 'start'
            });
        }
    });

})(jQuery, _, s, honeyPot)