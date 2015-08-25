define('ember-cli-wordpress/tests/unit/routes/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:post", "PostRoute", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});