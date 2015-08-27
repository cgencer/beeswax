define('ember-bootstrap/mixins/component-parent', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({

    /**
     * Array of registered child components
     *
     * @property children
     * @type array
     * @protected
     */
    children: null,

    _onInit: Ember['default'].on('init', function () {
      this.set('children', Ember['default'].A());
    }),

    /**
     * Register a component as a child of this parent
     *
     * @method registerChild
     * @param child
     * @public
     */
    registerChild: function registerChild(child) {
      Ember['default'].run.schedule('sync', this, function () {
        this.get('children').addObject(child);
      });
    },

    /**
     * Remove the child component from this parent component
     *
     * @method removeChild
     * @param child
     * @public
     */
    removeChild: function removeChild(child) {
      this.get('children').removeObject(child);
    }
  });

});