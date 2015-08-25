define('ember-bootstrap-components/components/bs-textarea', ['exports', 'ember', 'ember-bootstrap-components/mixins/i18n-support'], function (exports, Ember, I18nSupport) {

    'use strict';

    exports['default'] = Ember['default'].TextArea.extend(I18nSupport['default'], {
        classNames: ['form-control']
    });

});