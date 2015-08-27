define('ember-bootstrap/components/bs-dropdown-button', ['exports', 'ember-bootstrap/components/bs-button', 'ember-bootstrap/mixins/dropdown-toggle'], function (exports, Button, DropdownToggle) {

	'use strict';

	exports['default'] = Button['default'].extend(DropdownToggle['default']);

});