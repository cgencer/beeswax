import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
console.log('modelling posts/index.js');
	return this.store.findAll('post');
  }
});
