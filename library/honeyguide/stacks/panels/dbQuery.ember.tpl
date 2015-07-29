		<script type="text/x-handlebars" data-template-name="todo-list">
			{{#if length}}
			<section id="main">
				{{#if canToggle}}
				{{input type="checkbox" id="toggle-all" checked=allTodos.allAreDone}}
				{{/if}}
				<ul id="todo-list">
					{{#each todo in this}}
					<li {{bind-attr class="isCompleted:completed isEditing:editing"}}>
						{{#if todo.isEditing}}
						{{todo-input type="text" class="edit" value=bufferedTitle focus-out="doneEditing" insert-newline="doneEditing" escape-press="cancelEditing"}}
						{{else}}
						{{input type="checkbox" class="toggle" checked=todo.isCompleted}}
						<label {{action "editTodo" on="doubleClick"}}>{{todo.title}}</label>
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
		</script>

		<script type="text/x-handlebars" data-template-name="application">
			{{outlet}}
		</script>

		<script type="text/x-handlebars" data-template-name="index">
			{{group-chat messages=model action="sendMessage"}}
			{{multi-liner packages=model action="sendMessage"}}
		</script>

		<script type="text/x-handlebars" data-template-name="components/group-chat">
			<div class="chat-component">
				<ul class="conversation">
					{{#each message in messages}}
					<li class="txt">{{chat-message username=message.twitterUserName message=message.text time=message.timeStamp }}</li>
					{{/each}}
				</ul>

				<form class="new-message" {{action submit on="submit"}}>
					{{input type="text" placeholder="Send new message" value=message class="txt-field"}}
					{{input type="submit" class="send-btn" value="Send"}}
				</form>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="components/chat-message">
			<div class="message media">
				<div class="img">
					{{user-avatar username=username service="twitter"}}
				</div>
				<div class="bd">
					{{user-message message=message}}
					{{time-stamp time=time}}
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="components/user-avatar">
			<img {{bind-attr src=avatarUrl alt=username}} class="avatar">
		</script>

		<script type="text/x-handlebars" data-template-name="components/user-message">
			<div class="user-message">{{message}}</div>
		</script>

		<script type="text/x-handlebars" data-template-name="components/time-stamp">
			<div class="time-stamp">
				<span class="clock" role="presentation"></span>
				<span class="time">{{format-date time}}</span>
			</div>
		</script>




		<script type="text/x-handlebars" data-template-name="components/multi-liner">
			{{#each pack in packages}}
			{{one-liner item=pack}}
			{{/each}}
		</script>

		<script type="text/x-handlebars" data-template-name="components/one-liner">
			<div class="row ddrow" style="padding:4px;">
				<div class="col-md-8">
					<div class="input-group">
						<div class="input-group-btn">
							<span class="dropdown ddLeft">
								<button type="button" class="btn btn-default btn-xs dropdown-toggle" id="dMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Content-type <span class="caret"></span></button>
								<ul class="dropdown-menu" aria-labelledby="dMenu1">
									{{#each item in left}}
									<li><a href="#" class="type_{{item.type}}" alt="{{item.values}}">{{item.label}}{{#item.required}} (*){{/item.required}}</a></li>
									{{/each}}
								</ul>
							</span>
							<span class="dropdown ddMid">
								<button type="button" class="btn btn-default btn-xs dropdown-toggle" id="dMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><=> <span class="caret"></span></button>
								<ul class="dropdown-menu" aria-labelledby="dMenu2">
									<li><a href="#">=</a></li>
									<li><a href="#"><</a></li>
									<li><a href="#">></a></li>
								</ul>
							</span>
							<span class="dropdown ddRight">
								<button type="button" class="btn btn-default btn-xs dropdown-toggle" id="dMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
								<ul class="dropdown-menu" aria-labelledby="dMenu3">
									<li><a href="#">Action</a></li>
									<li><a href="#">Another action</a></li>
									<li><a href="#">Something else here</a></li>
									<li role="separator" class="divider"></li>
									<li><a href="#">Separated link</a></li>
								</ul>
							</span>
						</div>
					</div>
				</div>
				<div class="col-md-4 text-right pull-right">
					<div class="btn-group">
						<a href="#" class="btn btn-default btn-xs">on</a>
						<a href="#" class="btn btn-default btn-xs">off</a>
					</div>
					<a id="addLiner" class="btn btn-primary btn-xs oneLinerButton">+</a>
				</div>
			</div>
		</script>