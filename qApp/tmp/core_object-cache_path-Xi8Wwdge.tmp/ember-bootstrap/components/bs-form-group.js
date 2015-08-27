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