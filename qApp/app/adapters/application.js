import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.wordpress.host,
  namespace: config.wordpress.namespace || 'wp-json',
/*
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: config.wordpress.host,
  ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});
*/

/*
  ajax: function(path, options) {
    var options = options || {};
    options.dataType = 'json';
  },
*/

/*
  headers: Ember.computed('session.authToken', function() {
	return {
		"API_KEY": this.get("session.authToken"),
		"ANOTHER_HEADER": "Some header value"
	};
  }),
*/

/*
  ajaxOptions: function(url, type, options) {
    var hash = this._super(url, type, options);
    hash.dataType = "jsonp";
    return hash;
  },
*/

  shouldReloadRecord: function() { return true; },
  shouldReloadAll: function() { return true; },
  shouldBackgroundReloadRecord: function() { return true; },
  shouldBackgroundReloadAll: function() { return true; },

});
