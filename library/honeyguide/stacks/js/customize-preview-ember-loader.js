(function($) {
	"use strict";

	require.config({
		baseUrl: set.stacksURL + 'js/app/',

		shim: {
			Ember: {
				deps: ['Handlebars', 'jQuery'],
				exports: 'Ember'
			},

			DS: {
				deps: ['Ember'],
				exports: 'DS'
			},

			LS: {
				deps: ['Ember', 'DS'],
				exports: 'LS'
			}
		},

		paths: {
			DS: '../vendor/deprec/ember-data',
			LS: '../vendor/deprec/localstorage_adapter',
			Ember: '../vendor/deprec/ember',
			jQuery: '../vendor/deprec/jquery',
			Handlebars: '../vendor/deprec/handlebars'
		}
	});

	require(['Todos'], function (Todos) {

		var $ = jQuery;
		$('iframe').contents().find('body').removeClass('ember-application');
		var sRev = $('iframe').contents().find('#slider');
		$('<div class="ember-application"></div>').appendTo(sRev);

		Todos.deferReadiness();

		require([
			'router',
			'models/store',
			'models/todo',
			'controllers/todo_controller',
			'controllers/todos_controller',
			'views/edit_todo_view'
			],
			function (Router, StoreModel, TodoModel, TodoController, TodosController, EditTodoView) {

				Router();
				console.log('ember:router called');

				Todos.Store = StoreModel;
				Todos.Todo = TodoModel;

				Todos.TodoController = TodoController;
				Todos.TodosController = TodosController;

				Todos.EditTodoView = EditTodoView;

				Todos.advanceReadiness();
				console.log('ember:start called');
			}
		);
	});

})(jQuery);