module.exports = (function($, _, s, honeyPot) {
    'use strict';

    var App = exports.honeyPot.App;
    App.QueryRowComponent = Ember.Component.extend({

        queryData: [],
        order: 0,
        actions: {
            deleteTodo: function(todo) {
                var todos = this.modelFor('index').todos;
                todos.removeObject(todo);
            }
        }
    });

})(jQuery, _, s, honeyPot)