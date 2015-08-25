import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  status: DS.attr(),
  type: DS.attr(),
  author: DS.belongsTo('user'),
  content: DS.attr(),
  parent: DS.attr(),
  link: DS.attr(),
  date: DS.attr('date'),
  modified: DS.attr('date'),
  format: DS.attr(),
  slug: DS.attr(),
  guid: DS.attr(),
  meta: DS.attr(),
  excerpt: DS.attr(),
  menu_order: DS.attr('number'),
  comment_status: DS.attr(),
  ping_status: DS.attr(),
  sticky: DS.attr('boolean'),
  date_tz: DS.attr(),
  date_gmt: DS.attr('date'),
  modified_tz: DS.attr(),
  modified_gmt: DS.attr('date'),
  featured_image: DS.attr(),
  tags: DS.hasMany('tag'),
  categories: DS.hasMany('category')
});
