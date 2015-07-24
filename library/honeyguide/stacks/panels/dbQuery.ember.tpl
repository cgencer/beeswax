		<script type="text/x-handlebars" data-template-name="todo-list">
			{{#if length}}
				<section id="main">
					{{#if canToggle}}
						{{input type="checkbox" id="toggle-all" checked=allTodos.allAreDone}}
					{{/if}}
					<ul id="todo-list">
						{{#each}}
							<li {{bind-attr class="isCompleted:completed isEditing:editing"}}>
								{{#if isEditing}}
									{{todo-input type="text" class="edit" value=bufferedTitle focus-out="doneEditing" insert-newline="doneEditing" escape-press="cancelEditing"}}
								{{else}}
									{{input type="checkbox" class="toggle" checked=isCompleted}}
									<label {{action "editTodo" on="doubleClick"}}>{{title}}</label>
									<button {{action "removeTodo"}} class="destroy"></button>
								{{/if}}
								</li>
						{{/each}}
					</ul>
				</section>
			{{/if}}
		</script>
		<script type="text/x-handlebars" data-template-name="todos">
			<section id="todoapp">
				<header id="header">
					<h1>todos</h1>
					{{todo-input id="new-todo" type="text" value=newTitle action="createTodo" placeholder="What needs to be done?"}}
				</header>
					{{outlet}}
					{{#if length}}
						<footer id="footer">
							<span id="todo-count"><strong>{{remaining.length}}</strong> {{pluralize 'item' remaining.length}} left</span>
							<ul id="filters">
								<li>
									{{#link-to "todos.index" activeClass="selected"}}All{{/link-to}}
								</li>
								<li>
									{{#link-to "todos.active" activeClass="selected"}}Active{{/link-to}}
								</li>
								<li>
									{{#link-to "todos.completed" activeClass="selected"}}Completed{{/link-to}}
								</li>
							</ul>
							{{#if completed.length}}
								<button id="clear-completed" {{action "clearCompleted"}}>Clear completed</button>
							{{/if}}
						</footer>
					{{/if}}
			</section>