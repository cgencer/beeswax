define('ember-cli-wordpress/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    username: DS['default'].attr(),
    name: DS['default'].attr(),
    first_name: DS['default'].attr(),
    last_name: DS['default'].attr(),
    nickname: DS['default'].attr(),
    slug: DS['default'].attr(),
    meta: DS['default'].attr(),
    URL: DS['default'].attr(),
    avatar: DS['default'].attr(),
    description: DS['default'].attr(),
    registered: DS['default'].attr("date")
  });

});