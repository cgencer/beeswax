define('ember-cli-wordpress/tests/unit/models/term-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("term", "Term", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});