define('ember-cli-wordpress/models/term', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr(),
    slug: DS['default'].attr(),
    description: DS['default'].attr(),
    parent: DS['default'].attr(),
    taxonomy: DS['default'].attr(),
    meta: DS['default'].attr(),
    count: DS['default'].attr('number'),
    link: DS['default'].attr(),
    posts: DS['default'].hasMany('post', { async: true })
  });

});