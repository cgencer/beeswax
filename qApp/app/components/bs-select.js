import Ember from 'ember';

export default Ember.Component.extend(Ember.Evented, {
    actions: {
    	selectedAnItem: function(info, id) {
			var parentView = this.get('parentView');	// gets you the one-liner view

			var lastElement = $(this.get('element')).siblings(':last').find('.dropdown');

    		this.sendAction('action', info, id);
/*			this.globalEvents.trigger('oneliner:bar', {
				selection: info,
				id: id
			});
*/
//    		lastElement.toggleProperty('bbSelect');

/*
			if('regexp'===info.type) {
				var savedElement = lastElement.html();
				lastElement.html('<input id="ember671" type="text" class="ember-view ember-text-field form-control">');
			}else if('regexp'===info.type && null !== savedElement) {
				lastElement.html(savedElement);
			};
*/
		}
	}
});
