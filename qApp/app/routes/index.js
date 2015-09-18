import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Route.extend({
  model: function(params) {

  	if(_.isUndefined(params.set)){
  		console.dir('params is undefined!');
  		return false;
  	}else{
		console.log('results for index: ');
		console.dir(params.set);
		return this.store.find('post', params.set);
	}
  },
});
