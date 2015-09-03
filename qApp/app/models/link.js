import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr(),
  collection: DS.attr(),
  replies: DS.attr(),
  self: DS.attr(),
  versionhistory: DS.attr(),
});
