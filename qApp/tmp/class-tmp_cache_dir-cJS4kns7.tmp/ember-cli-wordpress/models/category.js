define('ember-cli-wordpress/models/category', ['exports', 'ember-cli-wordpress/models/term'], function (exports, Term) {

  'use strict';

  exports['default'] = Term['default'].extend({
    taxonomy: DS.attr(),
    meta: DS.attr()
  });

});