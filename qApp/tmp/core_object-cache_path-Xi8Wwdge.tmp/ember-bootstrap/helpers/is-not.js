define('ember-bootstrap/helpers/is-not', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.isNot = isNot;

  function isNot(params /*, hash*/) {
    return !params[0];
  }

  exports['default'] = Ember['default'].Helper.helper(isNot);

});