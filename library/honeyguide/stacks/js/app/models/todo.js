/*global Todos, DS */
(function() {
    'use strict';

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: todo.js')

            Todos.Todo = DS.Model.extend({
                title: DS.attr('string'),
                isCompleted: DS.attr('boolean')
            });
        }
    });
})();
