define('ember-bootstrap/components/bs-textarea', ['exports', 'ember', 'ember-bootstrap/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

  'use strict';

  exports['default'] = Ember['default'].TextArea.extend(I18nSupport['default'], {
    classNames: ['form-control']
  });

});