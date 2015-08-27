define('ember-bootstrap/mixins/component-child', ['exports', 'ember', 'ember-bootstrap/mixins/component-parent'], function (exports, Ember, ComponentParentMixin) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({

    _didInsertElement: Ember['default'].on('didInsertElement', function () {
      var parent = this.nearestOfType(ComponentParentMixin['default']);
      if (parent) {
        parent.registerChild(this);
      }
    }),

    _willDestroyElement: Ember['default'].on('willDestroyElement', function () {
      var parent = this.nearestOfType(ComponentParentMixin['default']);
      if (parent) {
        parent.removeChild(this);
      }
    })

  });

});