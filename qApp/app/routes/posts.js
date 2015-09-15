import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
	var theType = params.post_type ? params.post_type : 'post';

	console.log('modelling posts: '+theType);
	console.dir(params);

	return this.store.findAll(theType);
  }
});
