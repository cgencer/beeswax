import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
console.log('modelling posts/post.js');
	return this.store.find('post', params.post_id);
  }
});
