define('ember-bootstrap-components/components/bs-dropdown-toggle', ['exports', 'ember', 'ember-bootstrap-components/mixins/dropdown-toggle'], function (exports, Ember, DropdownToggle) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(DropdownToggle['default'], {
        /**
         * Defaults to a `<a>` tag. Change for other types of dropdown toggles.
         *
         * @property tagName
         * @type string
         * @default a
         * @public
         */
        tagName: 'a',

        attributeBindings: ['href'],

        /**
         * Computed property to generate a `href="#"` attribute when `tagName` is "a".
         *
         * @property href
         * @type string
         * @readonly
         * @protected
         */
        href: Ember['default'].computed('tagName', function(){
            if (this.get('tagName').toUpperCase() === 'A') {
                return '#';
            }
        }),


        click: function (e) {
            e.preventDefault();
            this.sendAction();
        }


    });

});