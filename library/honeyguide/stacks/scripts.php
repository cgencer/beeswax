<?php
return array(
	'preview' => array(
		'honeyguide-cCommPrvw' => array(
			'path' => $this->dasModel->stacksUrl . 'js/cCommPreviewer.js',
			'required' => array('customize-preview-widgets')
			),
		'honeypot-util' => array(
			'path' => $this->dasModel->stacksUrl . 'js/honeyPot/util.js',
			'required' => array('jquery', 'customize-preview-widgets')
			),
		'honeypot-editor' => array(
			'path' => $this->dasModel->stacksUrl . 'js/honeyPot/editor.js',
			'required' => array('jquery', 'honeypot-util', 'customize-preview-widgets')
//				),
				// https://github.com/xwp/wp-customize-inline-editing
//				'customize-inline-editing-preview' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/customize-preview.js',
//					'required' => array('jquery', 'customize-preview')
			),
				// 
		'slidereveal' => array(
			'path' => $this->dasModel->themeUrl . '/bower_components/slidereveal/dist/jquery.slidereveal.min.js',
			'required' => array('jquery', 'customize-preview')
			),
		'preview-slidePanel' => array(
			'path' => $this->dasModel->stacksUrl . 'js/customize-preview-slidepanel.js',
			'required' => array('jquery', 'customize-preview', 'bootstrap')
			),
		'preview-stackMenus' => array(
			'path' => $this->dasModel->stacksUrl . 'js/customize-preview-stackMenus.js',
			'required' => array('jquery', 'customize-preview')
			),
		'lodash' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/lodash/lodash.min.js',
			'required' => array('jquery', 'customize-preview')
			),
		'utils' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/utils.js'
			),
		'lsbridge' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/lsbridge/build/lsbridge.min.js'
			),
		'utils' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/utils.js'
			),
		'exports-polyfill' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/exports-polyfill/exports-polyfill.min.js'
			),
// All below here are for the TO-DO app...
		'todomvc-base' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/todomvc-common/base.js'
			),
		'jquery' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/jquery/dist/jquery.js'
			),
		'handlebars' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/handlebars/dist/handlebars.js'
			),
		'moment' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/moment/min/moment-with-locales.min.js'
			),
		'ember' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/components-ember/ember.js'
			'path' => $this->dasModel->stacksUrl . 'js/vendor/ember/ember.debug.js'
			),
		'ember-template-compiler' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/ember/ember-template-compiler.js'
			),
		'ember-restless' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/ember-restless/dist/ember-restless.js'
			),
		'ember-data' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/ember-data/ember-data.js'
			),
		'ember-localstorage' => array(
			'path' => $this->dasModel->stacksUrl . 'js/vendor/dependencies/ember-localstorage-adapter/localstorage_adapter.js'
			),
		'ember-app' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/app/app.js'
			'path' => $this->dasModel->stacksUrl . 'js/customize-preview-ember-loader.js',
			),
		'emberApp' => array(
			'path' => $this->dasModel->stacksUrl . 'js/app/build/app.min.js'
/*				),
				'todomvc-router' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/router.js'
				),
				'todomvc-todo' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/models/todo.js'
				),
				'todomvc-todoscontroller' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/controllers/todos_controller.js'
				),
				'todomvc-todolistcontroller' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/controllers/todos_list_controller.js'
				),
				'todomvc-todocontroller' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/controllers/todo_controller.js'
				),
				'todomvc-todoinputcomponent' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/views/todo_input_component.js'
				),
				'todomvc-pluralize' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/helpers/pluralize.js'
				),
				'todomvc-app' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app/boot.js'
*/				)
/*
				'ember-app' => array(
					'path' => $this->dasModel->stacksUrl . 'js/customize-preview-ember-loader.js',
					'passthru' => array(
						'stacksURL' => $this->dasModel->stacksUrl
					),
					'required' => array('jquery', 'customize-preview')
				),
*/
),
'control' => array(
	'honeyguide-cCommCtrl' => array(
		'path' => $this->dasModel->stacksUrl . 'js/cCommController.js',
		'required' => array('customize-controls')
		),
	'lsbridge' => array(
		'path' => $this->dasModel->stacksUrl . 'js/vendor/lsbridge/build/lsbridge.min.js'
//				),
				// https://github.com/xwp/wp-customize-inline-editing
//				'customize-inline-editing-pane' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/customize-pane.js',
//					'required' => array('jquery', 'customize-preview')
		)
	),
'stacks' => array(
				// http://vitalets.github.io/x-editable/
	'stack-scripts-xeditable' => array(
		'path' => $this->dasModel->stacksUrl . 'js/vendor/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js',
		'required' => array('jquery', 'customize-preview')
		),
	'stack-styles-xeditable' => array(
		'path' => $this->dasModel->stacksUrl . 'js/vendor/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css',
		'required' => array()
		)
	)
);