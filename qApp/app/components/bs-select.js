import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
    	selectedAnItem: function(info, id) {
    		this.sendAction('action', info, id);
		}
	}
});
