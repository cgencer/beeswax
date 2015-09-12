import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
    	selectedAnItem: function(info) {
    		this.sendAction('action', info);
		}
	}
});
