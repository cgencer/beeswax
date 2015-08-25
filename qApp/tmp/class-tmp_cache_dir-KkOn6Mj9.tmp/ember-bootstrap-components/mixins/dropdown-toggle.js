define('ember-bootstrap-components/mixins/dropdown-toggle', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Mixin.create({
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