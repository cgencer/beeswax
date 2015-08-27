define('ember-bootstrap/mixins/type-class', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    /**
     * Prefix for the type class, e.g. "btn" for button type classes ("btn-primary2 etc.)
     *
     * @property classTypePrefix
     * @type string
     * @required
     * @protected
     */
    classTypePrefix: null,
    classNameBindings: ['typeClass'],
    typeClass: Ember['default'].computed('type', function () {
      var prefix = this.get('classTypePrefix'),
          type = this.get('type') || 'default';
      return prefix + '-' + type;
    }),

    /**
     * Property for type styling
     *
     * For the available types see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
     *
     * @property type
     * @type String
     * @default 'default'
     * @public
     */
    type: 'default'
  });

});