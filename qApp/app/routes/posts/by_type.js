import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

console.log('posts/by_Type.js');
	var theType = params.post_type ? params.post_type : 'posts';
console.log('results for ' + theType);
console.dir(params);
	return this.store.findAll('post', theType);
  }
});
