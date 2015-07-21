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
            exports: 'DS'
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
    // We'll avoid auto-initialization of the app while we manage our
    // dependencies.
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
        // Configure router.
        Router();

        // Configure models.
        Todos.Store = StoreModel;
        Todos.Todo = TodoModel;

        // Configure controllers.
        Todos.TodoController = TodoController;
        Todos.TodosController = TodosController;

        // Configure view.
        Todos.EditTodoView = EditTodoView;

        // We're ready to launch the app!
        Todos.advanceReadiness();
    });
});
