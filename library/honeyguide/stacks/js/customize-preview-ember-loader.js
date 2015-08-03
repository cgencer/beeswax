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
            console.log(honeyPot.stacksURL + 'js/app/services/adapter.js');
            App.ApplicationAdapter = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/services/adapter.js');
            App.ApplicationSerializer = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/services/serializer.js');

            /*
            App.Router.map(honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/router.js'));
            App.IndexRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/index.js');

            App.PostRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/post.js').extend();
            App.PageRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/post.js').extend();
            App.UserRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/user.js');
            App.TagRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/term.js').extend();
            App.CategoryRoute = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/routes/term.js').extend();

                        App.Post = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/models/post.js').extend();
                        App.Page = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/models/post.js').extend();
                        App.User = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/models/user.js');
                        App.Tag = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/models/term.js').extend();
                        App.Category = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/models/term.js').extend();

                        App.SinglePostComponent = honeyPot.loadFile(honeyPot.stacksURL + 'js/app/components/single-post.js');
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