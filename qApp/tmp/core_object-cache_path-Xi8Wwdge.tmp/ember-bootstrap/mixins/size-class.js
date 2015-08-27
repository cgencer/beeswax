define('ember-bootstrap/mixins/size-class', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    /**
     * Prefix for the size class, e.g. "btn" for button size classes ("btn-lg", "btn-sm" etc.)
     *
     * @property classTypePrefix
     * @type string
     * @required
     * @protected
     */
    classTypePrefix: null,
    classNameBindings: ['sizeClass'],
    sizeClass: Ember['default'].computed('size', function () {
      var prefix = this.get('classTypePrefix'),
          size = this.get('size');
      return Ember['default'].isBlank(size) ? null : prefix + '-' + size;
    }),

    /**
     * Property for size styling, set to 'lg', 'sm' or 'xs'
     *
     * Also see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
     *
     * @property size
     * @type String
     * @public
     */
    size: null
  });

});