import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

// https://poststatus.com/wp-json/posts?type[]=poststatus_org&filter[posts_per_page]=2&filter[order]=ASC
// http://wplab.dev/wp-json/posts?type[]=stack
console.log('posts/by_type.js: '+params.post_type);

//    return this.store.findAll('post', params);
/*
	return this.store.findAll('post', {
		type: params.post_type ? params.post_type : 'posts', 
		posts_per_page: 2, 
		order: 'ASC'
	});
*/
/*
	Ember.$.ajaxSetup({
		method: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		url: 'http://wplab.dev/wp-json/posts',
//		header: {}, 				// An object of additional header key/value pairs to send along with requests 
//		accepts: '',				// The content type sent in the request header that tells the server what kind of response it will accept in return
//		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',			// When sending data to the server, use this content type

	});
	return Ember.$.ajax({
		data: { 
			type: params.post_type 
		}
	});
*/
	return Ember.$.getJSON('http://wplab.dev/wp-json/posts?type[]='+params.post_type+'&callback=?');

//	return this.store.findAll('post', {type: 'stack', posts_per_page: 2, order: 'ASC'});
  }
});
