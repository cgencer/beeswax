define('ember-bootstrap-components/components/bs-dropdown-button', ['exports', 'ember-bootstrap-components/components/bs-button', 'ember-bootstrap-components/mixins/dropdown-toggle'], function (exports, Button, DropdownToggle) {

	'use strict';

	exports['default'] = Button['default'].extend(DropdownToggle['default']);

});