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