define(function(require, _) {
    var messages = require('messages');
    var print = require('print');
    print(messages.getHello());

    var App = Ember.Application.create({
//		rootElement: '#app',
		location: 'none'
    });
	App.ApplicationAdapter = DS.FixtureAdapter.extend();

	App.Router.map(function() {
		this.resource('query', { path: '/' });
	});

	App.Query = DS.Model.extend({
		title: DS.attr('string'),
		isCompleted: DS.attr('boolean')
	});

	App.Query.FIXTURES = 
		[{
			id: 1,
			title: 'Learn Ember.js',
			isCompleted: true
		},{
			id: 2,
			title: '...',
			isCompleted: false
		},{
			id: 3,
			title: 'Profit!',
			isCompleted: false
		}];

	App.QueryRoute = Ember.Route.extend({
		model: function() {
			return this.store.find('query');
		}
	});
});