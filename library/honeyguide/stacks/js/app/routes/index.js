define(function(require, exports, module) {
    module.exports = Ember.Route.extend({
        model: function() {
            return this.store.find('post');
        }
    });
});