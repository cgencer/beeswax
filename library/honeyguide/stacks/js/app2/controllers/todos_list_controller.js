/*global Todos, Ember */
(function() {
    'use strict';

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: todos_list_controller.js')

            Todos.TodosListController = Ember.ArrayController.extend({
                needs: ['todos'],
                allTodos: Ember.computed.alias('controllers.todos'),
                itemController: 'todo',
                canToggle: function() {
                    var anyTodos = this.get('allTodos.length');
                    var isEditing = this.isAny('isEditing');

                    return anyTodos && !isEditing;
                }.property('allTodos.length', '@each.isEditing')
            });
        }
    });
})();
