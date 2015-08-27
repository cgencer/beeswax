define('ember-bootstrap/mixins/dropdown-toggle', ['exports', 'ember', 'ember-bootstrap/mixins/component-child'], function (exports, Ember, componentChild) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create(componentChild['default'], {
    classNames: ['dropdown-toggle'],
    attributeBindings: ['data-toggle'],
    /**
     * @property ariaRole
     * @default button
     * @type string
     * @protected
     */
    ariaRole: 'button',

    'data-toggle': 'dropdown',

    targetObject: Ember['default'].computed.alias('parentView'),

    /**
     * The default action is set to "toggleDropdown" on the parent {{#crossLink "Components.Dropdown"}}{{/crossLink}}
     *
     * @property action
     * @default toggleDropdown
     * @type string
     * @protected
     */
    action: 'toggleDropdown'
  });

});