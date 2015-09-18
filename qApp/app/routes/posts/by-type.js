import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

console.log('posts/by_type.js');
	var theType = params.post_type ? params.post_type : 'posts';
console.log('.results for ' + params.post_type);
console.dir(this.store.findAll('post', params));
debugger;
	return this.store.findAll('post', params);
  }
});
