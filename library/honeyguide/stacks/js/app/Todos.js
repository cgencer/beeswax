(function($) {
	"use strict";


	define(
		'Todos',
		['Ember'],
		function (Ember) {
			console.log('creation of ember:APP');

//			jQuery( document ).ready(function( $ ) {
			return window.Todos = Ember.Application.create({
//				rootElement: '#emberArea'
			});
//			})
	});

})(jQuery);