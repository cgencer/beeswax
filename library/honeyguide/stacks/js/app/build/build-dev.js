define(function(require, exports, module) {
    (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }
        return s
    })({
        1: [function(require, module, exports) {
            module.exports = Ember.Component.extend({
                init: Ember.K
            });

        }, {}],
        2: [function(require, module, exports) {
            $(function() {

                var App = Ember.Application.create();

                // Services
                App.ApplicationAdapter = require('./services/adapter');
                App.ApplicationSerializer = require('./services/serializer');

                // Routes
                App.Router.map(require('./routes/router'));
                App.IndexRoute = require('./routes/index');
                App.PostRoute = require('./routes/post').extend();
                App.PageRoute = require('./routes/post').extend();
                App.UserRoute = require('./routes/user');
                App.TagRoute = require('./routes/term').extend();
                App.CategoryRoute = require('./routes/term').extend();

                // Models
                App.Post = require('./models/post').extend();
                App.Page = require('./models/post').extend();
                App.User = require('./models/user');
                App.Tag = require('./models/term').extend();
                App.Category = require('./models/term').extend();

                // Components
                App.SinglePostComponent = require('./components/single-post');

            });

        }, {
            "./components/single-post": 1,
            "./models/post": 3,
            "./models/term": 4,
            "./models/user": 5,
            "./routes/index": 6,
            "./routes/post": 7,
            "./routes/router": 8,
            "./routes/term": 9,
            "./routes/user": 10,
            "./services/adapter": 11,
            "./services/serializer": 12
        }],
        3: [function(require, module, exports) {
            module.exports = DS.Model.extend({
                title: DS.attr(),
                status: DS.attr(),
                type: DS.attr(),
                author: DS.belongsTo('user'),
                content: DS.attr(),
                parent: DS.attr(),
                link: DS.attr(),
                date: DS.attr('date'),
                modified: DS.attr('date'),
                format: DS.attr(),
                slug: DS.attr(),
                guid: DS.attr(),
                excerpt: DS.attr(),
                menu_order: DS.attr('number'),
                comment_status: DS.attr(),
                ping_status: DS.attr(),
                sticky: DS.attr('boolean'),
                date_tz: DS.attr(),
                date_gmt: DS.attr('date'),
                modified_tz: DS.attr(),
                modified_gmt: DS.attr('date'),
                featured_image: DS.attr(),
                tags: DS.hasMany('tag'),
                categories: DS.hasMany('category')
            });

        }, {}],
        4: [function(require, module, exports) {
            module.exports = DS.Model.extend({
                name: DS.attr(),
                slug: DS.attr(),
                description: DS.attr(),
                parent: DS.attr(),
                count: DS.attr('number'),
                link: DS.attr(),
                posts: DS.hasMany('post', {
                    async: true
                })
            });

        }, {}],
        5: [function(require, module, exports) {
            module.exports = DS.Model.extend({
                username: DS.attr(),
                name: DS.attr(),
                first_name: DS.attr(),
                last_name: DS.attr(),
                nickname: DS.attr(),
                slug: DS.attr(),
                URL: DS.attr(),
                avatar: DS.attr(),
                description: DS.attr(),
                registered: DS.attr('date'),
                posts: DS.hasMany('post', {
                    inverse: 'author',
                    async: true
                })
            });

        }, {}],
        6: [function(require, module, exports) {
            module.exports = Ember.Route.extend({
                model: function() {
                    return this.store.find('post');
                }
            });

        }, {}],
        7: [function(require, module, exports) {
            module.exports = Ember.Route.extend({

                model: function(params) {

                    var type = this.routeName;

                    return this.store.find(type, {
                        filter: {
                            name: params[type]
                        }
                    });
                }

            });

        }, {}],
        8: [function(require, module, exports) {
            module.exports = function() {
                this.route('index', {
                    path: '/'
                });
                this.route('post', {
                    path: '/post/:post'
                });
                this.route('page', {
                    path: '/page/:page'
                });
                this.route('user', {
                    path: '/user/:user'
                });
                this.route('tag', {
                    path: '/tag/:term'
                });
                this.route('category', {
                    path: '/category/:term'
                });
            };

        }, {}],
        9: [function(require, module, exports) {
            module.exports = Ember.Route.extend({

                filter: function(type) {

                    var filter = '';

                    if (type === 'tag') {
                        filter = 'tag';
                    } else if (type === 'category') {
                        filter = 'category_name';
                    }

                    return filter;
                },

                model: function(params) {

                    var type = this.routeName;
                    var filter = this.filter(type);
                    var query = {
                            filter: {}
                        };

                    query.filter[filter] = params.term;

                    return this.store.find('post', query);
                },

                setupController: function(controller, model) {
                    this._super(controller, model);

                    var type = this.routeName;
                    var filter = this.filter(type);
                    var slug = model.query.filter[filter];

                    var term = this.store.all(type).filter(function(term) {
                        return term.get('slug') === slug;
                    });

                    this.controllerFor(type).set('term', term.objectAt(0));
                }

            });

        }, {}],
        10: [function(require, module, exports) {
            module.exports = Ember.Route.extend({
                model: function(params) {
                    return this.store.find('post', {
                        filter: {
                            author_name: params.user
                        }
                    });
                },

                setupController: function(controller, model) {
                    this._super(controller, model);

                    var slug = model.query.filter.author_name;

                    var user = this.store.all('user').filter(function(user) {
                        return user.get('slug') === slug;
                    });

                    this.controllerFor('user').set('author', user.objectAt(0));
                }
            });

        }, {}],
        11: [function(require, module, exports) {
            module.exports = DS.RESTAdapter.extend({
                host: "http://wplab.dev" || location.host,
                namespace: "wplab" || 'wp-json',
            });

        }, {}],
        12: [function(require, module, exports) {
            module.exports = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

                primaryKey: 'ID',

                attrs: {
                    author: {
                        embedded: 'always'
                    },
                    tags: {
                        embedded: 'always'
                    },
                    categories: {
                        embedded: 'always'
                    }
                },

                extractArray: function(store, type, payload) {

                    var data = {};
                    var extracted = [];
                    var root = Ember.String.pluralize(type.typeKey);

                    payload.forEach(function(e, i) {

                        if (typeof e.terms.post_tag !== 'undefined') {
                            e.tags = e.terms.post_tag;
                        }

                        if (typeof e.terms.category !== 'undefined') {
                            e.categories = e.terms.category;
                        }

                        delete e.terms;
                        extracted.push(e);
                    });

                    data[root] = extracted;

                    return this._super(store, type, data);
                },

            });

        }, {}]
    }, {}, [2])
    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jZ2VuY2VyL3dvcngvbGFiL0VtYmVyLURhdGEtV29yZFByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9jZ2VuY2VyL3dvcngvbGFiL0VtYmVyLURhdGEtV29yZFByZXNzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3NpbmdsZS1wb3N0LmpzIiwiL1VzZXJzL2NnZW5jZXIvd29yeC9sYWIvRW1iZXItRGF0YS1Xb3JkUHJlc3MvYXNzZXRzL2pzL2Zha2VfNzRhYzk4OGQuanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvbW9kZWxzL3Bvc3QuanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvbW9kZWxzL3Rlcm0uanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvbW9kZWxzL3VzZXIuanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvcm91dGVzL2luZGV4LmpzIiwiL1VzZXJzL2NnZW5jZXIvd29yeC9sYWIvRW1iZXItRGF0YS1Xb3JkUHJlc3MvYXNzZXRzL2pzL3JvdXRlcy9wb3N0LmpzIiwiL1VzZXJzL2NnZW5jZXIvd29yeC9sYWIvRW1iZXItRGF0YS1Xb3JkUHJlc3MvYXNzZXRzL2pzL3JvdXRlcy9yb3V0ZXIuanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvcm91dGVzL3Rlcm0uanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvcm91dGVzL3VzZXIuanMiLCIvVXNlcnMvY2dlbmNlci93b3J4L2xhYi9FbWJlci1EYXRhLVdvcmRQcmVzcy9hc3NldHMvanMvc2VydmljZXMvYWRhcHRlci5qcyIsIi9Vc2Vycy9jZ2VuY2VyL3dvcngvbGFiL0VtYmVyLURhdGEtV29yZFByZXNzL2Fzc2V0cy9qcy9zZXJ2aWNlcy9zZXJpYWxpemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuXHRpbml0OiBFbWJlci5LXG59KTtcbiIsIiQoZnVuY3Rpb24oKSB7XG5cblx0dmFyIEFwcCA9IEVtYmVyLkFwcGxpY2F0aW9uLmNyZWF0ZSgpO1xuXG5cdC8vIFNlcnZpY2VzXG5cdEFwcC5BcHBsaWNhdGlvbkFkYXB0ZXIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2FkYXB0ZXInKTtcblx0QXBwLkFwcGxpY2F0aW9uU2VyaWFsaXplciA9IHJlcXVpcmUoJy4vc2VydmljZXMvc2VyaWFsaXplcicpO1xuXG5cdC8vIFJvdXRlc1xuXHRBcHAuUm91dGVyLm1hcCggcmVxdWlyZSgnLi9yb3V0ZXMvcm91dGVyJykgKTtcblx0QXBwLkluZGV4Um91dGUgPSByZXF1aXJlKCcuL3JvdXRlcy9pbmRleCcpO1xuXHRBcHAuUG9zdFJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZXMvcG9zdCcpLmV4dGVuZCgpO1xuXHRBcHAuUGFnZVJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZXMvcG9zdCcpLmV4dGVuZCgpO1xuXHRBcHAuVXNlclJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZXMvdXNlcicpO1xuXHRBcHAuVGFnUm91dGUgPSByZXF1aXJlKCcuL3JvdXRlcy90ZXJtJykuZXh0ZW5kKCk7XG5cdEFwcC5DYXRlZ29yeVJvdXRlID0gcmVxdWlyZSgnLi9yb3V0ZXMvdGVybScpLmV4dGVuZCgpO1xuXG5cdC8vIE1vZGVsc1xuXHRBcHAuUG9zdCA9IHJlcXVpcmUoJy4vbW9kZWxzL3Bvc3QnKS5leHRlbmQoKTtcblx0QXBwLlBhZ2UgPSByZXF1aXJlKCcuL21vZGVscy9wb3N0JykuZXh0ZW5kKCk7XG5cdEFwcC5Vc2VyID0gcmVxdWlyZSgnLi9tb2RlbHMvdXNlcicpO1xuXHRBcHAuVGFnID0gcmVxdWlyZSgnLi9tb2RlbHMvdGVybScpLmV4dGVuZCgpO1xuXHRBcHAuQ2F0ZWdvcnkgPSByZXF1aXJlKCcuL21vZGVscy90ZXJtJykuZXh0ZW5kKCk7XG5cblx0Ly8gQ29tcG9uZW50c1xuXHRBcHAuU2luZ2xlUG9zdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaW5nbGUtcG9zdCcpO1xuXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gRFMuTW9kZWwuZXh0ZW5kKHtcblx0dGl0bGU6IERTLmF0dHIoKSxcblx0c3RhdHVzOiBEUy5hdHRyKCksXG5cdHR5cGU6IERTLmF0dHIoKSxcblx0YXV0aG9yOiBEUy5iZWxvbmdzVG8oJ3VzZXInKSxcblx0Y29udGVudDogRFMuYXR0cigpLFxuXHRwYXJlbnQ6IERTLmF0dHIoKSxcblx0bGluazogRFMuYXR0cigpLFxuXHRkYXRlOiBEUy5hdHRyKCdkYXRlJyksXG5cdG1vZGlmaWVkOiBEUy5hdHRyKCdkYXRlJyksXG5cdGZvcm1hdDogRFMuYXR0cigpLFxuXHRzbHVnOiBEUy5hdHRyKCksXG5cdGd1aWQ6IERTLmF0dHIoKSxcblx0ZXhjZXJwdDogRFMuYXR0cigpLFxuXHRtZW51X29yZGVyOiBEUy5hdHRyKCdudW1iZXInKSxcblx0Y29tbWVudF9zdGF0dXM6IERTLmF0dHIoKSxcblx0cGluZ19zdGF0dXM6IERTLmF0dHIoKSxcblx0c3RpY2t5OiBEUy5hdHRyKCdib29sZWFuJyksXG5cdGRhdGVfdHo6IERTLmF0dHIoKSxcblx0ZGF0ZV9nbXQ6IERTLmF0dHIoJ2RhdGUnKSxcblx0bW9kaWZpZWRfdHo6IERTLmF0dHIoKSxcblx0bW9kaWZpZWRfZ210OiBEUy5hdHRyKCdkYXRlJyksXG5cdGZlYXR1cmVkX2ltYWdlOiBEUy5hdHRyKCksXG5cdHRhZ3M6IERTLmhhc01hbnkoJ3RhZycpLFxuXHRjYXRlZ29yaWVzOiBEUy5oYXNNYW55KCdjYXRlZ29yeScpXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gRFMuTW9kZWwuZXh0ZW5kKHtcblx0bmFtZTogRFMuYXR0cigpLFxuXHRzbHVnOiBEUy5hdHRyKCksXG5cdGRlc2NyaXB0aW9uOiBEUy5hdHRyKCksXG5cdHBhcmVudDogRFMuYXR0cigpLFxuXHRjb3VudDogRFMuYXR0cignbnVtYmVyJyksXG5cdGxpbms6IERTLmF0dHIoKSxcblx0cG9zdHM6IERTLmhhc01hbnkoJ3Bvc3QnLCB7XG5cdFx0YXN5bmM6IHRydWVcblx0fSlcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBEUy5Nb2RlbC5leHRlbmQoe1xuXHR1c2VybmFtZTogRFMuYXR0cigpLFxuXHRuYW1lOiBEUy5hdHRyKCksXG5cdGZpcnN0X25hbWU6IERTLmF0dHIoKSxcblx0bGFzdF9uYW1lOiBEUy5hdHRyKCksXG5cdG5pY2tuYW1lOiBEUy5hdHRyKCksXG5cdHNsdWc6IERTLmF0dHIoKSxcblx0VVJMOiBEUy5hdHRyKCksXG5cdGF2YXRhcjogRFMuYXR0cigpLFxuXHRkZXNjcmlwdGlvbjogRFMuYXR0cigpLFxuXHRyZWdpc3RlcmVkOiBEUy5hdHRyKCdkYXRlJyksXG5cdHBvc3RzOiBEUy5oYXNNYW55KCdwb3N0Jywge1xuXHRcdGludmVyc2U6ICdhdXRob3InLFxuXHRcdGFzeW5jOiB0cnVlXG5cdH0pXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gRW1iZXIuUm91dGUuZXh0ZW5kKHtcblx0bW9kZWw6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnN0b3JlLmZpbmQoJ3Bvc3QnKTtcblx0fVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEVtYmVyLlJvdXRlLmV4dGVuZCh7XG5cblx0bW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xuXG5cdFx0dmFyIHR5cGUgPSB0aGlzLnJvdXRlTmFtZTtcblxuXHRcdHJldHVybiB0aGlzLnN0b3JlLmZpbmQodHlwZSwge1xuXHRcdFx0ZmlsdGVyOiB7XG5cdFx0XHRcdG5hbWU6IHBhcmFtc1t0eXBlXVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5yb3V0ZSgnaW5kZXgnLCB7cGF0aDogJy8nfSk7XG5cdHRoaXMucm91dGUoJ3Bvc3QnLCB7cGF0aDogJy9wb3N0Lzpwb3N0J30pO1xuXHR0aGlzLnJvdXRlKCdwYWdlJywge3BhdGg6ICcvcGFnZS86cGFnZSd9KTtcblx0dGhpcy5yb3V0ZSgndXNlcicsIHtwYXRoOiAnL3VzZXIvOnVzZXInfSk7XG5cdHRoaXMucm91dGUoJ3RhZycsIHtwYXRoOiAnL3RhZy86dGVybSd9KTtcblx0dGhpcy5yb3V0ZSgnY2F0ZWdvcnknLCB7cGF0aDogJy9jYXRlZ29yeS86dGVybSd9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEVtYmVyLlJvdXRlLmV4dGVuZCh7XG5cblx0ZmlsdGVyOiBmdW5jdGlvbih0eXBlKSB7XG5cblx0XHR2YXIgZmlsdGVyID0gJyc7XG5cblx0XHRpZiAoIHR5cGUgPT09ICd0YWcnICkge1xuXHRcdFx0ZmlsdGVyID0gJ3RhZyc7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB0eXBlID09PSAnY2F0ZWdvcnknICkge1xuXHRcdFx0ZmlsdGVyID0gJ2NhdGVnb3J5X25hbWUnO1xuXHRcdH1cblxuXHRcdHJldHVybiBmaWx0ZXI7XG5cdH0sXG5cblx0bW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xuXG5cdFx0dmFyIHR5cGUgPSB0aGlzLnJvdXRlTmFtZSxcblx0XHRcdGZpbHRlciA9IHRoaXMuZmlsdGVyKHR5cGUpLFxuXHRcdFx0cXVlcnkgPSB7XG5cdFx0XHRcdGZpbHRlcjoge31cblx0XHRcdH07XG5cblx0XHRxdWVyeS5maWx0ZXJbZmlsdGVyXSA9IHBhcmFtcy50ZXJtO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RvcmUuZmluZCgncG9zdCcsIHF1ZXJ5KTtcblx0fSxcblxuXHRzZXR1cENvbnRyb2xsZXI6IGZ1bmN0aW9uIChjb250cm9sbGVyLCBtb2RlbCkge1xuXHRcdHRoaXMuX3N1cGVyKGNvbnRyb2xsZXIsIG1vZGVsKTtcblxuXHRcdHZhciB0eXBlID0gdGhpcy5yb3V0ZU5hbWUsXG5cdFx0XHRmaWx0ZXIgPSB0aGlzLmZpbHRlcih0eXBlKSxcblx0XHRcdHNsdWcgPSBtb2RlbC5xdWVyeS5maWx0ZXJbZmlsdGVyXTtcblxuXHRcdHZhciB0ZXJtID0gdGhpcy5zdG9yZS5hbGwodHlwZSkuZmlsdGVyKGZ1bmN0aW9uKHRlcm0pe1xuXHRcdFx0cmV0dXJuIHRlcm0uZ2V0KCdzbHVnJykgPT09IHNsdWc7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbnRyb2xsZXJGb3IodHlwZSkuc2V0KCd0ZXJtJywgdGVybS5vYmplY3RBdCgwKSk7XG5cdH1cblxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEVtYmVyLlJvdXRlLmV4dGVuZCh7XG5cdG1vZGVsOiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRyZXR1cm4gdGhpcy5zdG9yZS5maW5kKCdwb3N0Jywge1xuXHRcdFx0ZmlsdGVyOiB7XG5cdFx0XHRcdGF1dGhvcl9uYW1lOiBwYXJhbXMudXNlclxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHNldHVwQ29udHJvbGxlcjogZnVuY3Rpb24gKGNvbnRyb2xsZXIsIG1vZGVsKSB7XG5cdFx0dGhpcy5fc3VwZXIoY29udHJvbGxlciwgbW9kZWwpO1xuXG5cdFx0dmFyIHNsdWcgPSBtb2RlbC5xdWVyeS5maWx0ZXIuYXV0aG9yX25hbWU7XG5cblx0XHR2YXIgdXNlciA9IHRoaXMuc3RvcmUuYWxsKCd1c2VyJykuZmlsdGVyKGZ1bmN0aW9uKHVzZXIpe1xuXHRcdFx0cmV0dXJuIHVzZXIuZ2V0KCdzbHVnJykgPT09IHNsdWc7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbnRyb2xsZXJGb3IoJ3VzZXInKS5zZXQoJ2F1dGhvcicsIHVzZXIub2JqZWN0QXQoMCkpO1xuXHR9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gRFMuUkVTVEFkYXB0ZXIuZXh0ZW5kKHtcblx0aG9zdDogXCJodHRwOi8vd3BsYWIuZGV2XCIgfHwgbG9jYXRpb24uaG9zdCxcblx0bmFtZXNwYWNlOiBcIndwbGFiXCIgfHwgJ3dwLWpzb24nLFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERTLlJFU1RTZXJpYWxpemVyLmV4dGVuZChEUy5FbWJlZGRlZFJlY29yZHNNaXhpbiwge1xuXG5cdHByaW1hcnlLZXk6ICdJRCcsXG5cblx0YXR0cnM6IHtcblx0XHRhdXRob3I6IHtcblx0XHRcdGVtYmVkZGVkOiAnYWx3YXlzJ1xuXHRcdH0sXG5cdFx0dGFnczoge1xuXHRcdFx0ZW1iZWRkZWQ6ICdhbHdheXMnXG5cdFx0fSxcblx0XHRjYXRlZ29yaWVzOiB7XG5cdFx0XHRlbWJlZGRlZDogJ2Fsd2F5cydcblx0XHR9XG5cdH0sXG5cblx0ZXh0cmFjdEFycmF5OiBmdW5jdGlvbihzdG9yZSwgdHlwZSwgcGF5bG9hZCkge1xuXG5cdFx0dmFyIGRhdGEgPSB7fSxcblx0XHRcdGV4dHJhY3RlZCA9IFtdLFxuXHRcdFx0cm9vdCA9IEVtYmVyLlN0cmluZy5wbHVyYWxpemUodHlwZS50eXBlS2V5KTtcblxuXHRcdHBheWxvYWQuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcblxuXHRcdFx0aWYgKCB0eXBlb2YgZS50ZXJtcy5wb3N0X3RhZyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdGUudGFncyA9IGUudGVybXMucG9zdF90YWc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZW9mIGUudGVybXMuY2F0ZWdvcnkgIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRlLmNhdGVnb3JpZXMgPSBlLnRlcm1zLmNhdGVnb3J5O1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgZS50ZXJtcztcblx0XHRcdGV4dHJhY3RlZC5wdXNoKGUpO1xuXHRcdH0pO1xuXG5cdFx0ZGF0YVtyb290XSA9IGV4dHJhY3RlZDtcblxuXHRcdHJldHVybiB0aGlzLl9zdXBlcihzdG9yZSwgdHlwZSwgZGF0YSk7XG5cdH0sXG5cbn0pO1xuIl19
});
