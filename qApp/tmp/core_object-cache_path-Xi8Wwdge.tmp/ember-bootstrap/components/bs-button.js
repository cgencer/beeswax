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