import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  imports: {
//    Handlebars: Handlebars,
//    jQuery: $,
    console: window.console
  },
  LOG_TRANSITIONS_INTERNAL:  false,
  LOG_ACTIVE_GENERATION:     true,
  LOG_VIEW_LOOKUPS:          true,
  LOG_RESOLVER:              false
});

// this should remove CORS errors

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: config.wordpress.host,
  ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});

loadInitializers(App, config.modulePrefix);

Ember.run.backburner.DEBUG            = true;
Ember.ENV.RAISE_ON_DEPRECATION        = true;
Ember.LOG_STACKTRACE_ON_DEPRECATION   = true;
Ember.LOG_BINDINGS                    = true;
Ember.RSVP.on('error', function(error) {
  Ember.Logger.assert(false, error);
});
/*
App.QueryRule = Ember.Object.extend({
    className: null,
    values: null,
    required: false,
    label: null,
    related: null,
    order: -1},
});
*/
App.QueryRules = {
    post_type: {
        className: 'choices',
        values: "[post, page, any]+",
        required: true,
        label: "Content Type",
        related: null,
        order: 0},
    post_status: {
        className: 'choices',
        values: "[publish, pending, private, future, trash, any]+",
        required: false,
        label: "Status",
        related: null,
        order: 1},
    page_id: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "ID",
        related: null,
        order: 2},
    posts_per_page: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "Pagination count",
        related: null},
    post_parent: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "Parent ID",
        related: null},
    orderby: {
        className: 'choices',
        values: "[none, ID, author, title, name, type, date, modified, parent, rand, comment_count, menu_order, meta_value, meta_value_num, post__in]+",
        required: false,
        label: "order by",
        related: null},
    order: {
        className: 'choices',
        values: "[ASC, DESC]*",
        required: false,
        label: "order",
        related: "orderby"},
    offset: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "offset",
        related: "posts_per_page"},
    paged: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "paged",
        related: "posts_per_page"},
    page: {
        className: 'regexp',
        values: "[0-9]*",
        required: false,
        label: "page",
        related: "posts_per_page"},
    ignore_sticky_posts: {
        className: 'choices',
        values: "[true, false]+",
        required: false,
        label: "Ignore sticky posts",
        related: null},
    year: {
        className: 'regexp',
        values: "[0-9]{4}+",
        required: false,
        label: "Date: year",
        related: null},
    monthnum: {
        className: 'choices',
        values: "[1,2,3,4,5,6,7,8,9,10,11,12]+",
        required: false,
        label: "Date: month",
        related: "year"},
    w: {
        className: 'regexp',
        values: "[0-9]{2}+",
        required: false,
        label: "Date: week",
        related: null},
    day: {
        className: 'regexp',
        values: "[0-9]{2}+",
        required: false,
        label: "Date: day",
        related: "year"}
};
export default App;
