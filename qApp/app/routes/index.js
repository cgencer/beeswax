import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
	console.log('results for index');
	return this.store.findAll('post');
  },
});
