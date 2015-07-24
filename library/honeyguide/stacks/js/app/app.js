/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create({
    rootElement: '#emberArea'
});

Todos.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'todos-emberjs'
});
