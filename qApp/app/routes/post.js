import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    console.log('modelling post');
    console.dir(params);
    return this.store.findAll('post', params);
  }
});
