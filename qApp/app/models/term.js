import DS from 'ember-data';

export default DS.Model.extend({
  count: DS.attr('number'),
  description: DS.attr(),
  link: DS.attr(),
  meta: DS.attr(),
  name: DS.attr(),
  parent: DS.attr(),
  posts: DS.hasMany('post', { async: true }),
  slug: DS.attr(),
  taxonomy: DS.attr()
});
