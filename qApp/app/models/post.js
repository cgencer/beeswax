import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('user'),
  comment_status: DS.attr(),
  content: DS.attr(),
  date: DS.attr('date'),
  date_gmt: DS.attr('date'),
  date_tz: DS.attr(),
  excerpt: DS.attr(),
  featured_image: DS.attr(),
  format: DS.attr(),
  guid: DS.attr(),
  link: DS.attr(),
  menu_order: DS.attr('number'),
  meta: DS.attr(),
  modified: DS.attr('date'),
  modified_gmt: DS.attr('date'),
  modified_tz: DS.attr(),
  parent: DS.attr(),
  ping_status: DS.attr(),
  slug: DS.attr(),
  status: DS.attr(),
  sticky: DS.attr('boolean'),
  terms: DS.hasMany('category'),
  title: DS.attr(),
  type: DS.attr()
});
