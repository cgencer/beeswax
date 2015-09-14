import DS from 'ember-data';
import config from '../config/environment';
import _ from 'lodash/lodash';

export default DS.RESTAdapter.extend({
  host: config.wordpress.host,
  namespace: config.wordpress.namespace || 'wp-json',

  shouldReloadRecord: function() { return true; },
  shouldReloadAll: function() { return true; },
  shouldBackgroundReloadRecord: function() { return true; },
  shouldBackgroundReloadAll: function() { return true; },

});
