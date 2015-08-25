/* jshint ignore:start */

define('ember-cli-wordpress/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-cli-wordpress';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-cli-wordpress/tests/test-helper");
} else {
  require("ember-cli-wordpress/app")["default"].create({"name":"ember-cli-wordpress","version":"0.0.0.547a18a0"});
}

/* jshint ignore:end */
