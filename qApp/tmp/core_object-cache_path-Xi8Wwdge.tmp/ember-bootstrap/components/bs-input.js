define('ember-bootstrap/components/bs-input', ['exports', 'ember', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend(I18nSupport['default'], {
    classNames: ['form-control']
  });

});