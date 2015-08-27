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