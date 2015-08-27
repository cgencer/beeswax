define('ember-bootstrap/helpers/is-equal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.isEqual = isEqual;

  function isEqual(params) {
    return params[0] === params[1];
  }

  exports['default'] = Ember['default'].Helper.helper(isEqual);

});