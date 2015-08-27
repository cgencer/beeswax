define('ember-bootstrap', ['ember-bootstrap/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-bootstrap/components/bs-alert', ['exports', 'ember', 'ember-bootstrap/mixins/type-class'], function (exports, Ember, TypeClass) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(TypeClass['default'], {
        classNameBindings: ['alert', 'fade', 'in'],

        /**
         * A dismissible alert will have a close button in the upper right corner, that the user can click to dismiss
         * the alert.
         *
         * @property dismissible
         * @type boolean
         * @default true
         * @public
         */
        dismissible: true,

        /**
         * If true the alert is completely hidden. Will be set when the fade animation has finished.
         *
         * @property dismissed
         * @type boolean
         * @default false
         * @readonly
         * @protected
         */
        dismissed: false,

        /**
         * This property indicates if the alert is visible. If false it might still be in the DOM until the fade animation
         * has completed. Can be set to change the visibility of the alert box.
         *
         * @property visible
         * @type boolean
         * @default true
         * @public
         */
        visible: true,

        /**
         * Set to false to disable the fade out animation when hiding the alert.
         *
         * @property fade
         * @type boolean
         * @default true
         * @public
         */
        fade: true,

        /**
         * Computed property to set the alert class to the component div. Will be false when dismissed to have the component
         * div (which cannot be removed form DOM by the component itself) without any markup.
         *
         * @property alert
         * @type boolean
         * @private
         */
        alert: Ember['default'].computed.not('dismissed'),
        'in': Ember['default'].computed.and('visible', 'fade'),

        /**
         * @property classTypePrefix
         * @type String
         * @default 'alert'
         * @protected
         */
        classTypePrefix: 'alert',

        /**
         * The duration of the fade out animation
         *
         * @property fadeDuration
         * @type integer
         * @default 150
         * @public
         */
        fadeDuration: 150,

        actions: {
            dismiss: function dismiss() {
                this.hide();
            }
        },

        _onVisibleChange: Ember['default'].observer('visible', function () {
            if (this.get('visible')) {
                this.show();
            } else {
                this.hide();
            }
        }),

        /**
         * Call to make the alert visible again after it has been hidden
         *
         * @method show
         * @public
         */
        show: function show() {
            this.setProperties({
                dismissed: false,
                visible: true
            });
        },

        /**
         * Call to hide the alert. If the `fade` property is true, this will fade out the alert before being finally
         * dismissed.
         *
         * @method hide
         * @public
         */
        hide: function hide() {
            if (this.get('fade')) {
                this.set('visible', false);
                Ember['default'].run.later(this, function () {
                    if (!this.get('isDestroyed')) {
                        this.set('dismissed', true);
                    }
                }, this.get('fadeDuration'));
            } else {
                this.setProperties({
                    dismissed: true,
                    visible: false
                });
            }
        }

    });

});
define('ember-bootstrap/components/bs-button-group', ['exports', 'ember', 'ember-bootstrap/mixins/size-class', 'ember-bootstrap/mixins/component-parent'], function (exports, Ember, SizeClass, ComponentParent) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(ComponentParent['default'], SizeClass['default'], {

        /**
         * @type string
         * @property ariaRole
         * @default 'group'
         * @protected
         */
        ariaRole: 'group',

        /**
         * @property classNames
         * @type array
         * @default ['btn-group']
         * @protected
         */
        classNames: ['btn-group'],

        /**
         * @property classNameBindings
         * @type array
         * @protected
         */
        classNameBindings: ['vertical:btn-group-vertical', 'justified:btn-group-justified'],

        /**
         * @property classTypePrefix
         * @type String
         * @default 'btn-group'
         * @protected
         */
        classTypePrefix: 'btn-group',

        /**
         * Set to true for a vertically stacked button group, see http://getbootstrap.com/components/#btn-groups-vertical
         *
         * @property vertical
         * @type boolean
         * @default false
         * @public
         */
        vertical: false,

        /**
         * Set to true for the buttons to stretch at equal sizes to span the entire width of its parent.
         *
         * *Important*: You have to wrap every button component in a `div class="btn-group">`:
         *
         * ```handlebars
         * <div class="btn-group" role="group">
         * {{#bs-button}}My Button{{/bs-button}}
         * </div>
         * ```
         *
         * See http://getbootstrap.com/components/#btn-groups-justified
         *
         * @property justified
         * @type boolean
         * @default false
         * @public
         */
        justified: false,

        /**
         * The type of the button group specifies how child buttons behave and how the `value` property will be computed:
         *
         * ### null
         * If `type` is not set (null), the button group will add no functionality besides Bootstrap styling
         *
         * ### radio
         * if `type` is set to "radio", the buttons will behave like radio buttons:
         * * the buttons will toggle (`toggle` property of the child buttons will be set to true)
         * * only one button may be active
         * * the `value` property of the button group will reflect the `value` property of the active button
         *
         * ### checkbox
         * if `type` is set to "checkbox", the buttons will behave like checkboxes:
         * * the buttons will toggle (`toggle` property of the child buttons will be set to true)
         * * any number of buttons may be active
         * * the `value` property of the button group will be an array containing the `value` properties of all active buttons
         *
         * @property type
         * @type string
         * @default null
         * @public
         */
        type: null,

        /**
         * The value of the button group, computed by its child buttons.
         * See the {{#crossLink "Button-Group/type:attribute"}}`type` property{{/crossLink}} for how the value property is constructed.
         *
         * When you set the value, the corresponding buttons will be activated:
         * * use a single value for a radio button group to activate the button with the same value
         * * use an array of values for a checkbox button group to activate all the buttons with values contained in the array
         *
         * @property value
         * @type array|any
         * @public
         */
        value: undefined,

        _syncValueToActiveButtons: Ember['default'].observer('value', 'children.@each.value', '_inDOM', function () {
            if (!this._inDOM) {
                return;
            }
            var value = this.get('value'),
                values = Ember['default'].A(!Ember['default'].isArray(value) ? [value] : value);
            this.get('children').forEach(function (button) {
                button.set('active', values.contains(button.get('value')));
            });
        }),

        /**
         * Child buttons that are active (pressed)
         * @property activeChildren
         * @type array
         * @protected
         */
        activeChildren: Ember['default'].computed.filterBy('children', 'active', true),

        lastActiveChildren: null,
        newActiveChildren: Ember['default'].computed.setDiff('activeChildren', 'lastActiveChildren'),
        _observeButtons: Ember['default'].observer('activeChildren.[]', 'type', function () {
            var type = this.get('type');

            if (!this._inDOM || type !== 'radio' && type !== 'checkbox') {
                return;
            }

            //var lastActiveChild = this.get('lastActiveChildren.firstObject')

            Ember['default'].run.scheduleOnce('actions', this, function () {
                // the button that just became active
                var newActive, lastActive, value;

                switch (type) {
                    case 'radio':
                        newActive = Ember['default'].A(this.get('newActiveChildren')).objectAt(0);
                        if (newActive) {
                            value = newActive.get('value');
                        } else {
                            lastActive = this.get('lastActiveChildren.firstObject');
                            if (lastActive) {
                                lastActive.set('active', true);
                            }
                        }
                        break;
                    case 'checkbox':
                        value = this.get('activeChildren').mapBy('value');
                        break;
                }
                if (value) {
                    this.set('value', value);
                }
                // remember activeChildren, used as a replacement for a before observer as they will be deprecated in the future...
                this.set('lastActiveChildren', Ember['default'].A(this.get('activeChildren').slice()));
            });
        }),

        _observeType: Ember['default'].observer('type', 'children.[]', function () {
            if (this.get('type') === 'radio' || this.get('type') === 'checkbox') {
                // set all child buttons to toggle
                this.get('children').forEach(function (button) {
                    button.set('toggle', true);
                });
            }
        }),

        init: function init() {
            this._super();
            this.set('lastActiveChildren', Ember['default'].A());
        },

        _inDOM: false,

        didInsertElement: function didInsertElement() {
            this.set('_inDOM', true);
            this.get('activeChildren');
        }
    });

});
define('ember-bootstrap/components/bs-button', ['exports', 'ember', 'ember-bootstrap/mixins/type-class', 'ember-bootstrap/mixins/size-class', 'ember-bootstrap/mixins/i18n-support', 'ember-bootstrap/mixins/component-child'], function (exports, Ember, TypeClass, SizeClass, I18nSupport, ComponentChild) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(ComponentChild['default'], TypeClass['default'], SizeClass['default'], I18nSupport['default'], {
    tagName: 'button',
    classNames: ['btn'],
    classNameBindings: ['active', 'block:btn-block'],

    /**
     * @property classTypePrefix
     * @type String
     * @default 'btn'
     * @protected
     */
    classTypePrefix: 'btn',

    attributeBindings: ['disabled', 'buttonType:type'],

    /**
     * Default label of the button. Not need if used as a block component
     *
     * @property defaultText
     * @type string
     * @public
     */
    defaultText: null,

    /**
     * Property to disable the button
     *
     * @property disabled
     * @type boolaen
     * @default false
     * @public
     */
    disabled: false,

    /**
     * Set the type of the button, either 'button' or 'submit'
     *
     * @property buttonType
     * @type String
     * @default 'button'
     * @public
     */
    buttonType: 'button',

    /**
     * Set the 'active' class to apply active/pressed CSS styling
     *
     * @property active
     * @type boolean
     * @default false
     * @public
     */
    active: false,

    /**
     * Property for block level buttons
     *
     * See the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
     * @property block
     * @type boolean
     * @default false
     * @public
     */
    block: false,

    /**
     * If toggle property is true, clicking the button will toggle the active state
     *
     * @property toggle
     * @type boolean
     * @default false
     * @public
     */
    toggle: false,

    /**
     * If button is active and this is set, the icon property will match this property
     *
     * @property iconActive
     * @type String
     * @public
     */
    iconActive: null,

    /**
     * If button is inactive and this is set, the icon property will match this property
     *
     * @property iconInactive
     * @type String
     * @public
     */
    iconInactive: null,

    /**
     * Class(es) (e.g. glyphicons or font awesome) to use as a button icon
     * This will render a <i class="{{icon}}"></i> element in front of the button's label
     *
     * @property icon
     * @type String
     * @readonly
     * @protected
     */
    icon: Ember['default'].computed('active', function () {
      if (this.get('active')) {
        return this.get('iconActive');
      } else {
        return this.get('iconInactive');
      }
    }),

    /**
     * Supply a value that will be associated with this button. This will be send
     * as a parameter of the default action triggered when clicking the button
     *
     * @property value
     * @type any
     * @public
     */
    value: null,

    /**
     * State of the button. The button's label (if not used as a block component) will be set to the
     * `<state>Text` property.
     * This property will automatically be set when using a click action that supplies the callback with an promise
     *
     * @property textState
     * @type String
     * @default 'default'
     * @protected
     */
    textState: 'default',

    /**
     * Set this to true to reset the state. A typical use case is to bind this attribute with ember-data isDirty flag.
     *
     * @property reset
     * @type boolean
     * @public
     */
    reset: null,

    /**
     * This will reset the state property to 'default', and with that the button's label to defaultText
     *
     * @method resetState
     * @protected
     */
    resetState: function resetState() {
      this.set('textState', 'default');
    },

    resetObserver: Ember['default'].observer('reset', function () {
      if (this.get('reset')) {
        Ember['default'].run.scheduleOnce('actions', this, function () {
          this.set('textState', 'default');
        });
      }
    }),

    text: Ember['default'].computed('textState', 'defaultText', 'pendingText', 'resolvedText', 'rejectedText', function () {
      return this.getWithDefault(this.get('textState') + 'Text', this.get('defaultText'));
    }),

    /**
     * Click handler. This will send the default "action" action, with the following parameters:
     * * value of the button (that is the value of the "value" property)
     * * original event object of the click event
     * * callback: call that with a promise object, and the buttons state will automatically set to "pending", "resolved" and/or "rejected"
     *
     * @method click
     * @protected
     * @param evt
     */
    click: function click(evt) {
      if (this.get('toggle')) {
        this.toggleProperty('active');
      }
      var that = this;
      var callback = function callback(promise) {
        if (promise) {
          that.set('textState', 'pending');
          promise.then(function () {
            if (!that.get('isDestroyed')) {
              that.set('textState', 'resolved');
            }
          }, function () {
            if (!that.get('isDestroyed')) {
              that.set('textState', 'rejected');
            }
          });
        }
      };
      this.sendAction('action', this.get('value'), evt, callback);
    },

    init: function init() {
      this._super();
      this.get('reset');
    }

  });

});
define('ember-bootstrap/components/bs-dropdown-button', ['exports', 'ember-bootstrap/components/bs-button', 'ember-bootstrap/mixins/dropdown-toggle'], function (exports, Button, DropdownToggle) {

	'use strict';

	exports['default'] = Button['default'].extend(DropdownToggle['default']);

});
define('ember-bootstrap/components/bs-dropdown-menu', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    /**
     * Defaults to a `<ul>` tag. Change for other types of dropdown menus.
     *
     * @property tagName
     * @type string
     * @default ul
     * @public
     */
    tagName: 'ul',
    classNames: ['dropdown-menu'],
    classNameBindings: ['alignClass'],

    /**
     * @property ariaRole
     * @default menu
     * @type string
     * @protected
     */
    ariaRole: 'menu',

    /**
     * Alignment of the menu, either "left" or "right"
     *
     * @property align
     * @type string
     * @default left
     * @public
     */
    align: 'left',

    alignClass: Ember['default'].computed('align', function () {
      if (this.get('align') !== 'left') {
        return 'dropdown-menu-' + this.get('align');
      }
    })

  });

});
define('ember-bootstrap/components/bs-dropdown-toggle', ['exports', 'ember', 'ember-bootstrap/mixins/dropdown-toggle'], function (exports, Ember, DropdownToggle) {

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
        href: Ember['default'].computed('tagName', function () {
            if (this.get('tagName').toUpperCase() === 'A') {
                return '#';
            }
        }),

        click: function click(e) {
            e.preventDefault();
            this.sendAction();
        }

    });

});
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
define('ember-bootstrap/components/bs-form-element', ['exports', 'ember', 'ember-bootstrap/components/bs-form-group', 'ember-bootstrap/components/bs-form', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, FormGroup, Form, I18nSupport) {

  'use strict';

  var nonTextFieldControlTypes = Ember['default'].A(['checkbox', 'select', 'select2', 'textarea']);

  /**
   Sub class of `Components.FormGroup` that adds automatic form layout markup and form validation features.

   ### Form layout

   The appropriate Bootstrap markup for the given `formLayout` and `controlType` is automatically generated to easily
   create forms without coding the default Bootstrap form markup by hand:

   ```hbs
   \{{#bs-form formLayout="horizontal" action="submit"}}
     \{{bs-form-element controlType="email" label="Email" placeholder="Email" value=email}}
     \{{bs-form-element controlType="password" label="Password" placeholder="Password" value=password}}
     \{{bs-form-element controlType="checkbox" label="Remember me" value=rememberMe}}
     \{{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
   \{{/bs-form}}
   ```

   ### Form validation

   In the following example the control elements of the three form elements value will be bound to the properties
   (given by `property`) of the form's `model`, which in this case is its controller (see `model=this`):

   ```hbs
   \{{#bs-form formLayout="horizontal" model=this action="submit"}}
     \{{bs-form-element controlType="email" label="Email" placeholder="Email" property="email"}}
     \{{bs-form-element controlType="password" label="Password" placeholder="Password" property="password"}}
     \{{bs-form-element controlType="checkbox" label="Remember me" property="rememberMe"}}
     \{{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
   \{{/bs-form}}
   ```

   By using this indirection in comparison to directly binding the `value` property, you get the benefit of automatic
   form validation, given that your `model` is implementing [ember-validations](https://github.com/dockyard/ember-validations).

   In the example above the `model` was our controller itself, so the control elements were bound to the appropriate
   properties of our controller. A controller implementing validations on those properties could look like this:

   ```js
   import Ember from 'ember';
   import EmberValidations from 'ember-validations';

   export default Ember.Controller.extend(EmberValidations,{
     email: null,
     password: null,
     rememberMe: false,
     validations: {
       email: {
         presence: true,
         format: {
           with: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
         }
       },
       password: {
         presence: true,
         length: { minimum: 6, maximum: 10}
       },
       comments: {
         length: { minimum: 5, maximum: 20}
       }
     }
   });
   ```

   If the `showValidation` property is `true` (which is automatically the case if a `focusOut` event is captured from the
   control element or the containing `Components.Form` was submitted with its `model` failing validation) and there are
   validation errors for the `model`'s `property`, the appropriate Bootstrap validation markup (see
   http://getbootstrap.com/css/#forms-control-validation) is applied:

   * `validation` is set to 'error', which will set the `has-error` CSS class
   * the `errorIcon` feedback icon is displayed if `controlType` is a text field
   * the validation messages are displayed as Bootstrap `help-block`s

   As soon as the validation is successful again...

   * `validation` is set to 'success', which will set the `has-success` CSS class
   * the `successIcon` feedback icon is displayed if `controlType` is a text field
   * the validation messages are removed

   ### I18n support

   Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
   See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}


   @class FormElement
   @namespace Components
   @extends Components.FormGroup
   @uses Mixins.I18nSupport
   */
  exports['default'] = FormGroup['default'].extend(I18nSupport['default'], {
    /**
     * Text to display within a `<label>` tag.
     *
     * @property label
     * @type string
     * @public
     */
    label: null,

    /**
     * The type of the control widget.
     * Supported types:
     *
     * * 'text'
     * * 'checkbox'
     * * 'select'
     * * 'select2' (needs [ember-select-2](https://github.com/iStefo/ember-select-2))
     * * 'textarea'
     * * any other type will use an input tag with the `controlType` value as the type attribute (for e.g. HTML5 input
     * types like 'email'), and the same layout as the 'text' type
     *
     * @property controlType
     * @type string
     * @public
     */
    controlType: 'text',

    /**
     * The value of the control element is bound to this property. You can bind it to some controller property to
     * get/set the control element's value:
     *
     * ```hbs
     * {{bs-form-element controlType="email" label="Email" placeholder="Email" value=email}}
     * ```
     *
     * Note: you loose the ability to validate this form element by directly binding to its value. It is recommended
     * to use the `property` feature instead.
     *
     *
     * @property value
     * @public
     */
    value: null,

    /**
     The property name of the form element's `model` (by default the `model` of its parent `Components.Form`) that this
     form element should represent. The control element's value will automatically be bound to the model property's
     value.
      Using this property enables form validation on this element.
      @property property
     @type string
     @public
     */
    property: null,

    /**
     * Control element's HTML5 placeholder attribute
     *
     * @property placeholder
     * @type string
     * @public
     */
    placeholder: null,

    /**
     * Control element's name attribute
     *
     * @property name
     * @type string
     * @public
     */
    name: null,

    /**
     * An array of objects containing the selection of choices for multiple choice style form controls, e.g. select
     * boxes.
     *
     * ```hbs
     * {{bs-form-element controlType="select" choices=countries choiceLabelProperty="name" choiceValueProperty="id" label="Country" value=selectedCountry}}
     * ```
     *
     * Be sure to also set the `choiceValueProperty` and `choiceLabelProperty` properties.
     *
     * @property choices
     * @type array
     * @public
     */
    choices: Ember['default'].A(),

    /**
     * The property of the `choices` array of objects, containing the value of the choice, e.g. the select box option.
     *
     * @property choiceValueProperty
     * @type string
     * @public
     */
    choiceValueProperty: null,

    /**
     * The property of the `choices` array of objects, containing the label of the choice, e.g. the select box option.
     *
     * @property choiceLabelProperty
     * @type string
     * @public
     */
    choiceLabelProperty: null,

    /**
     * Textarea's rows attribute (ignored for other `controlType`s)
     *
     * @property rows
     * @type integer
     * @default 5
     * @public
     */
    rows: 5,

    /**
     * Textarea's cols attribute (ignored for other `controlType`s)
     *
     * @property cols
     * @type integer
     * @public
     */
    cols: null,

    /**
     * The model used for validation. Defaults to the parent `Components.Form`'s `model`
     *
     * @property model
     * @public
     */
    model: Ember['default'].computed.alias('form.model'),

    /**
     * The array of error messages from the `model`'s validation.
     *
     * @property errors
     * @type array
     * @protected
     */
    errors: null,

    /**
     * @property hasErrors
     * @type boolean
     * @readonly
     * @protected
     */
    hasErrors: Ember['default'].computed.gt('errors.length', 0),

    /**
     * @property hasValidator
     * @type boolean
     * @readonly
     * @protected
     */
    hasValidator: Ember['default'].computed.notEmpty('model.validate'),

    /**
     * If `true` form validation markup is rendered (requires a validatable `model`).
     *
     * @property showValidation
     * @type boolean
     * @default false
     * @public
     */
    showValidation: false,

    /**
     * @property showErrors
     * @type boolean
     * @readonly
     * @protected
     */
    showErrors: Ember['default'].computed.and('showValidation', 'hasErrors'),

    /**
     * The validation ("error" or "success") or null if no validation is to be shown. Automatically computed from the
     * models validation state.
     *
     * @property validation
     * @readonly
     * @type string
     * @protected
     */
    validation: Ember['default'].computed('hasErrors', 'hasValidator', 'showValidation', function () {
      if (!this.get('showValidation') || !this.get('hasValidator')) {
        return null;
      }
      return this.get('hasErrors') ? 'error' : 'success';
    }),

    /**
     * @property hasLabel
     * @type boolean
     * @readonly
     * @protected
     */
    hasLabel: Ember['default'].computed.notEmpty('label'),

    /**
     * True for text field `controlType`s
     *
     * @property useIcons
     * @type boolean
     * @readonly
     * @public
     */
    useIcons: Ember['default'].computed('controlType', function () {
      return !nonTextFieldControlTypes.contains(this.get('controlType'));
    }),

    /**
     * The form layout used for the markup generation (see http://getbootstrap.com/css/#forms):
     *
     * * 'horizontal'
     * * 'vertical'
     * * 'inline'
     *
     * Defaults to the parent `form`'s `formLayout` property.
     *
     * @property formLayout
     * @type string
     * @public
     */
    formLayout: Ember['default'].computed.alias('form.formLayout'),

    /**
     * @property isVertical
     * @type boolean
     * @readonly
     * @protected
     */
    isVertical: Ember['default'].computed.equal('formLayout', 'vertical'),

    /**
     * @property isHorizontal
     * @type boolean
     * @readonly
     * @protected
     */
    isHorizontal: Ember['default'].computed.equal('formLayout', 'horizontal'),

    /**
     * @property isInline
     * @type boolean
     * @readonly
     * @protected
     */
    isInline: Ember['default'].computed.equal('formLayout', 'inline'),

    /**
     * The Bootstrap grid class for form labels within a horizontal layout form. Defaults to the value of the same
     * property of the parent form. The corresponding grid class for form controls is automatically computed.
     *
     * @property horizontalLabelGridClass
     * @type string
     * @default 'col-md-4'
     * @public
     */
    horizontalLabelGridClass: Ember['default'].computed.oneWay('form.horizontalLabelGridClass'),

    /**
     * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
     *
     * @property horizontalInputGridClass
     * @type string
     * @readonly
     * @protected
     */
    horizontalInputGridClass: Ember['default'].computed('horizontalLabelGridClass', function () {
      var parts = this.get('horizontalLabelGridClass').split('-');
      Ember['default'].assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
      parts[2] = 12 - parts[2];
      return parts.join('-');
    }),

    /**
     * Computed property that specifies the Bootstrap offset grid class for form controls within a horizontal layout
     * form, that have no label.
     *
     * @property horizontalInputOffsetGridClass
     * @type string
     * @readonly
     * @protected
     */
    horizontalInputOffsetGridClass: Ember['default'].computed('horizontalLabelGridClass', function () {
      var parts = this.get('horizontalLabelGridClass').split('-');
      parts.splice(2, 0, 'offset');
      return parts.join('-');
    }),

    /**
     * Reference to the parent `Components.Form` class.
     *
     * @property form
     * @protected
     */
    form: Ember['default'].computed(function () {
      return this.nearestOfType(Form['default']);
    }),

    layoutName: Ember['default'].computed('formLayout', 'controlType', function () {
      var formLayout = this.getWithDefault('formLayout', 'vertical'),
          inputLayout,
          controlType = this.get('controlType');

      switch (true) {
        case nonTextFieldControlTypes.contains(controlType):
          inputLayout = controlType;
          break;
        default:
          inputLayout = 'default';
      }

      return 'components/form-element/' + formLayout + '/' + inputLayout;
    }),

    _rerender: Ember['default'].observer('layoutName', function () {
      this.rerender();
    }),

    /**
     * Listen for focusOut events from the control element to automatically set `showValidation` to true to enable
     * form validation markup rendering.
     *
     * @event focusOut
     */
    focusOut: function focusOut() {
      this.set('showValidation', true);
    },

    init: function init() {
      this._super();
      if (!Ember['default'].isBlank(this.get('property'))) {
        Ember['default'].Binding.from("model." + this.get('property')).to('value').connect(this);
        Ember['default'].Binding.from("model.errors." + this.get('property')).to('errors').connect(this);
      }
    }
  });

});
define('ember-bootstrap/components/bs-form-group', ['exports', 'ember', 'ember-bootstrap/config'], function (exports, Ember, Config) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    classNames: ['form-group'],
    classNameBindings: ['validationClass', 'hasFeedback'],

    /**
     * Whether to show validation state icons.
     * See http://getbootstrap.com/css/#forms-control-validation
     *
     * @property useIcons
     * @type boolean
     * @default true
     * @public
     */
    useIcons: true,

    /**
     * Computed property which is true if the form group is in a validation state
     *
     * @property hasValidation
     * @type boolean
     * @public
     * @readonly
     */
    hasValidation: Ember['default'].computed.notEmpty('validation'),

    /**
     * Computed property which is true if the form group is showing a validation icon
     *
     * @property hasFeedback
     * @type boolean
     * @public
     * @readonly
     */
    hasFeedback: Ember['default'].computed.and('hasValidation', 'useIcons', 'hasIconForValidationState'),

    /**
     * The icon classes to be used for a feedback icon in a "success" validation state.
     * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
     * rendered if `useIcons` is false.
     *
     * You can change this globally by setting the `formValidationSuccessIcon` property of
     * the ember-bootstrap configuration in your config/environment.js file. If your are
     * using FontAwesome for example:
     *
     * ```js
     * ENV['ember-bootstrap'] = {
     *   formValidationSuccessIcon: 'fa fa-check'
     * }
     * ```
     *
     * @property successIcon
     * @type string
     * @default 'glyphicon glyphicon-ok'
     * @public
     */
    successIcon: Config['default'].formValidationSuccessIcon,

    /**
     * The icon classes to be used for a feedback icon in a "error" validation state.
     * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
     * rendered if `useIcons` is false.
     *
     * You can change this globally by setting the `formValidationErrorIcon` property of
     * the ember-bootstrap configuration in your config/environment.js file. If your are
     * using FontAwesome for example:
     *
     * ```js
     * ENV['ember-bootstrap'] = {
     *   formValidationErrorIcon: 'fa fa-times'
     * }
     * ```
     *
     * @property errorIcon
     * @type string
     * @public
     */
    errorIcon: Config['default'].formValidationErrorIcon,

    /**
     * The icon classes to be used for a feedback icon in a "warning" validation state.
     * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
     * rendered if `useIcons` is false.
     *
     * You can change this globally by setting the `formValidationWarningIcon` property of
     * the ember-bootstrap configuration in your config/environment.js file. If your are
     * using FontAwesome for example:
     *
     * ```js
     * ENV['ember-bootstrap'] = {
     *   formValidationWarningIcon: 'fa fa-warning'
     * }
     * ```
     *
     * @property warningIcon
     * @type string
     * @public
     */
    warningIcon: Config['default'].formValidationWarningIcon,

    /**
     * The icon classes to be used for a feedback icon in a "info" validation state.
     * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
     * rendered if `useIcons` is false.
     *
     * You can change this globally by setting the `formValidationInfoIcon` property of
     * the ember-bootstrap configuration in your config/environment.js file. If your are
     * using FontAwesome for example:
     *
     * ```js
     * ENV['ember-bootstrap'] = {
     *   formValidationInfoIcon: 'fa fa-info-circle
     * }
     * ```
     *
     * The "info" validation state is not supported in Bootstrap CSS, but can be easily added
     * using the following LESS style:
     * ```less
     * .has-info {
     *   .form-control-validation(@state-info-text; @state-info-text; @state-info-bg);
     * }
     * ```
     *
     * @property infoIcon
     * @type string
     * @public
     */
    infoIcon: Config['default'].formValidationInfoIcon,

    iconName: Ember['default'].computed('validation', function () {
      var validation = this.get('validation') || 'success';
      return this.get(validation + 'Icon');
    }),

    hasIconForValidationState: Ember['default'].computed.notEmpty('iconName'),

    /**
     * Set to a validation state to render the form-group with a validation style.
     * See http://getbootstrap.com/css/#forms-control-validation
     *
     * The default states of "success", "warning" and "error" are supported by Bootstrap out-of-the-box.
     * But you can use custom states as well. This will set a has-<state> class, and (if `useIcons`is true)
     * a feedback whose class is taken from the <state>Icon property
     *
     * @property validation
     * @type string
     * @public
     */
    validation: null,

    validationClass: Ember['default'].computed('validation', function () {
      var validation = this.get('validation');
      if (!Ember['default'].isBlank(validation)) {
        return 'has-' + this.get('validation');
      }
    })
  });

});
define('ember-bootstrap/components/bs-form', ['exports', 'ember', 'ember-bootstrap/components/bs-form-element'], function (exports, Ember, FormElement) {

   'use strict';

   exports['default'] = Ember['default'].Component.extend({
       tagName: 'form',
       classNameBindings: ['layoutClass'],
       ariaRole: 'form',

       /**
        * Bootstrap form class name (computed)
        *
        * @property layoutClass
        * @type string
        * @readonly
        * @protected
        *
        */
       layoutClass: Ember['default'].computed('formLayout', function () {
           var layout = this.get('formLayout');
           return layout === 'vertical' ? 'form' : 'form-' + layout;
       }),

       /**
        * Set a model that this form should represent. This serves several purposes:
        *
        * * child `Components.FormElement`s can access and bind to this model by their `property`
        * * when the model supports validation by using the [ember-validations](https://github.com/dockyard/ember-validations) mixin,
        * child `Components.FormElement`s will look at the validation information of their `property` and render their form group accordingly.
        * Moreover the form's `submit` event handler will validate the model and deny submitting if the model is not validated successfully.
        *
        * @property model
        * @type Ember.Object
        * @public
        */
       model: null,

       /**
        * Set the layout of the form to either "vertical", "horizontal" or "inline". See http://getbootstrap.com/css/#forms-inline and http://getbootstrap.com/css/#forms-horizontal
        *
        * @property formLayout
        * @type string
        * @public
        */
       formLayout: 'vertical',

       /**
        * Check if the `model` has a validate method, i.e. supports validation by using [ember-validations](https://github.com/dockyard/ember-validations)
        *
        * @property hasValidator
        * @type boolean
        * @readonly
        * @protected
        */
       hasValidator: Ember['default'].computed.notEmpty('model.validate'),

       /**
        * The Bootstrap grid class for form labels. This is used by the `Components.FormElement` class as a default for the
        * whole form.
        *
        * @property horizontalLabelGridClass
        * @type string
        * @default 'col-md-4'
        * @public
        */
       horizontalLabelGridClass: 'col-md-4',

       /**
        * If set to true pressing enter will submit the form, even if no submit button is present
        *
        * @property submitOnEnter
        * @type boolean
        * @default false
        * @public
        */
       submitOnEnter: false,

       /**
        * An array of `Components.FormElement`s that are children of this form.
        *
        * @property childFormElements
        * @type Array
        * @readonly
        * @protected
        */
       childFormElements: Ember['default'].computed.filter('childViews', function (view) {
           return view instanceof FormElement['default'];
       }),

       /**
        * Submit handler that will send the default action ("action") to the controller when submitting the form.
        *
        * If there is a supplied `model` that supports validation (`hasValidator`) the model will be validated before, and
        * only if validation is successful the default action will be sent. Otherwise an "invalid" action will be sent, and
        * all the `showValidation` property of all child `Components.FormElement`s will be set to true, so error state and
        * messages will be shown automatically.
        *
        * @event submit
        */
       submit: function submit(e) {
           var that = this;
           if (e) {
               e.preventDefault();
           }
           if (!this.get('hasValidator')) {
               return this.sendAction();
           } else {
               return this.get('model').validate().then(function () {
                   if (that.get('model.isValid')) {
                       return that.sendAction();
                   }
               })['catch'](function () {
                   that.get('childFormElements').setEach('showValidation', true);
                   return that.sendAction('invalid');
               });
           }
       },

       keyPress: function keyPress(e) {
           var code = e.keyCode || e.which;
           if (code === 13 && this.get('submitOnEnter')) {
               this.$().submit();
           }
       }
   });

});
define('ember-bootstrap/components/bs-input', ['exports', 'ember', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend(I18nSupport['default'], {
    classNames: ['form-control']
  });

});
define('ember-bootstrap/components/bs-select', ['exports', 'ember', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(I18nSupport['default'], {
    tagName: 'select',
    classNames: ['form-control'],

    content: null,
    prompt: null,
    optionValuePath: 'id',
    optionLabelPath: 'title',
    action: Ember['default'].K, // action to fire on change

    value: null,

    init: function init() {
      this._super.apply(this, arguments);
      if (!this.get('content')) {
        this.set('content', []);
      }
    },

    change: function change() {
      var selectEl = this.$().get(0);
      var selectedIndex = selectEl.selectedIndex;
      var content = this.get('content');

      // decrement index by 1 if we have a prompt
      var hasPrompt = !!this.get('prompt');
      var contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

      var selection = content[contentIndex];

      // set the local, shadowed selection to avoid leaking
      // changes to `selection` out via 2-way binding
      this.set('value', selection);

      var changeCallback = this.get('action');
      changeCallback(selection);
    }

  });

});
define('ember-bootstrap/components/bs-textarea', ['exports', 'ember', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

  'use strict';

  exports['default'] = Ember['default'].TextArea.extend(I18nSupport['default'], {
    classNames: ['form-control']
  });

});
define('ember-bootstrap/config', ['exports'], function (exports) {

    'use strict';

    var Config = {
        formValidationSuccessIcon: 'glyphicon glyphicon-ok',
        formValidationErrorIcon: 'glyphicon glyphicon-remove',
        formValidationWarningIcon: 'glyphicon glyphicon-warning-sign',
        formValidationInfoIcon: 'glyphicon glyphicon-info-sign',

        load: function load(config) {
            for (var property in this) {
                if (this.hasOwnProperty(property) && typeof this[property] !== 'function' && typeof config[property] !== 'undefined') {
                    this[property] = config[property];
                }
            }
        }
    };

    exports['default'] = Config;

});
define('ember-bootstrap/helpers/is-equal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.isEqual = isEqual;

  function isEqual(params) {
    return params[0] === params[1];
  }

  exports['default'] = Ember['default'].Helper.helper(isEqual);

});
define('ember-bootstrap/helpers/is-not', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.isNot = isNot;

  function isNot(params /*, hash*/) {
    return !params[0];
  }

  exports['default'] = Ember['default'].Helper.helper(isNot);

});
define('ember-bootstrap/helpers/read-path', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.readPath = readPath;

  function readPath(params /*, hash*/) {
    return Ember['default'].get(params[0], params[1]);
  }

  exports['default'] = Ember['default'].Helper.helper(readPath);

});
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
define('ember-bootstrap/mixins/i18n-support', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var Mixin;

    switch (true) {
        case Ember['default'].isPresent(Ember['default'].I18n):
            Mixin = Ember['default'].I18n.TranslateableProperties;
            break;
        default:
            Mixin = Ember['default'].Mixin.create();
    }

    exports['default'] = Mixin;

});
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

});//# sourceMappingURL=addons.map