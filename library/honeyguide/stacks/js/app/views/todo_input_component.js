/*global Todos, Ember */
(function() {
    'use strict';

    lsbridge.subscribe('emberBridge', function(data) {
        if ('start' === data.cmd) {
            console.log('reporting to duty: todo_input_component.js')

            Todos.TodoInputComponent = Ember.TextField.extend({
                focusOnInsert: function() {
                    // Re-set input value to get rid of a reduntant text selection
                    this.$().val(this.$().val());
                    this.$().focus();
                }.on('didInsertElement')
            });
        }
    });
})();
