import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
	console.log('modelling post');
	console.dir(params);

    var type = this.routeName;

    return this.store.findAll(type, {
      filter: {
        name: params[type]
      }
    });
  }
});
