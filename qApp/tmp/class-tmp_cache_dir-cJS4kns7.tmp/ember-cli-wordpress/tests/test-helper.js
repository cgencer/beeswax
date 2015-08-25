define('ember-cli-wordpress/tests/test-helper', ['ember-cli-wordpress/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});