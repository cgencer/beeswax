define('ember-bootstrap/helpers/read-path', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.readPath = readPath;

  function readPath(params /*, hash*/) {
    return Ember['default'].get(params[0], params[1]);
  }

  exports['default'] = Ember['default'].Helper.helper(readPath);

});