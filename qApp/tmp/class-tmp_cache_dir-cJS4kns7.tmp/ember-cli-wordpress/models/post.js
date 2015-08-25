define('ember-cli-wordpress/models/post', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr(),
    status: DS['default'].attr(),
    type: DS['default'].attr(),
    author: DS['default'].belongsTo("user"),
    content: DS['default'].attr(),
    parent: DS['default'].attr(),
    link: DS['default'].attr(),
    date: DS['default'].attr("date"),
    modified: DS['default'].attr("date"),
    format: DS['default'].attr(),
    slug: DS['default'].attr(),
    guid: DS['default'].attr(),
    meta: DS['default'].attr(),
    excerpt: DS['default'].attr(),
    menu_order: DS['default'].attr("number"),
    comment_status: DS['default'].attr(),
    ping_status: DS['default'].attr(),
    sticky: DS['default'].attr("boolean"),
    date_tz: DS['default'].attr(),
    date_gmt: DS['default'].attr("date"),
    modified_tz: DS['default'].attr(),
    modified_gmt: DS['default'].attr("date"),
    featured_image: DS['default'].attr(),
    tags: DS['default'].hasMany("tag"),
    categories: DS['default'].hasMany("category")
  });

});