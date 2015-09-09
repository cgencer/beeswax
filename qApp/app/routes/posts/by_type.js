import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

	var theType = params.post_type ? params.post_type : 'posts';

	return this.store.findAll('post', theType);
  }
});
