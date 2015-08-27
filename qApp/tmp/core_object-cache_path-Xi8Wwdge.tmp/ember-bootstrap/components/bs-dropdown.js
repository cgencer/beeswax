define('ember-bootstrap/components/bs-dropdown', ['exports', 'ember', 'ember-bootstrap/components/bs-dropdown-button', 'ember-bootstrap/mixins/component-parent'], function (exports, Ember, toggleButton, ComponentParent) {

   'use strict';

   exports['default'] = Ember['default'].Component.extend(ComponentParent['default'], {
       classNameBindings: ['open', 'containerClass'],

       /**
        * This property reflects the state of the dropdown, whether it is open or closed.
        *
        * @property open
        * @default false
        * @type boolean
        * @public
        */
       open: false,

       /**
        * By default clicking on an open dropdown menu will close it. Set this property to false for the menu to stay open.
        *
        * @property closeOnMenuClick
        * @default true
        * @type boolean
        * @public
        */
       closeOnMenuClick: true,

       /**
        * jQuery click event name, namespaced to this component's instance to prevent interference between multiple dropdowns.
        *
        * @property clickEventName
        * @type string
        * @private
        */
       clickEventName: undefined,

       /**
        * A computed property to generate the suiting class for the dropdown container, either "dropdown" or "btn-group".
        *
        * @property containerClass
        * @type string
        * @readonly
        * @protected
        */
       containerClass: Ember['default'].computed('toggleType', function () {
           return this.get('toggleType') === 'button' ? 'btn-group' : 'dropdown';
       }),

       /**
        * This property is "button" if the toggle element is an instance of {{#crossLink "Components.DropdownButton"}}{{/crossLink}}, otherwise "toggle".
        *
        * @property toggleType
        * @type string
        * @readonly
        * @protected
        */
       toggleType: Ember['default'].computed('children.[]', function () {
           if (this.get('children').any(function (view) {
               return view instanceof toggleButton['default'];
           })) {
               return 'button';
           }
           return 'toggle';
       }),

       actions: {
           toggleDropdown: function toggleDropdown() {
               this.toggleProperty('open');
           },

           openDropdown: function openDropdown() {
               this.set('open', true);
           },

           closeDropdown: function closeDropdown() {
               this.set('open', false);
           }
       },

       handleClickEvents: Ember['default'].observer('open', function () {
           if (this.get('open')) {
               Ember['default'].$(document).on(this.clickEventName, Ember['default'].run.bind(this, this.closeOnClickHandler));
           } else {
               Ember['default'].$(document).off(this.clickEventName);
           }
       }),

       willDestroyElement: function willDestroyElement() {
           Ember['default'].$(document).off(this.clickEventName);
       },

       init: function init() {
           this._super();
           // click event name that is namespaced to our component instance, so multiple dropdowns do not interfere
           // with each other
           this.clickEventName = 'click.' + this.get('elementId');
       },

       /**
        * Handler for click events to close the dropdown
        *
        * @method closeOnClickHandler
        * @param e
        * @protected
        */
       closeOnClickHandler: function closeOnClickHandler(e) {
           var $target = Ember['default'].$(e.target);
           if (!this.get('isDestroyed') && $target.closest(this.$().find('.dropdown-toggle')).length === 0 && ($target.closest(this.$().find('.dropdown-menu')).length === 0 || this.get('closeOnMenuClick'))) {
               this.set('open', false);
           }
       }
   });

});