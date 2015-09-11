import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
	return this.store.findAll('post');
  },
  queryRules: function() {
  	var set = {};
	for(var key in App.Dumpster) {
  		set.push( App.QueryRule.create(App.Dumpster[key]) );
  	}
  	return set;
  }
});
