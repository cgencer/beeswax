<script type="text/x-handlebars" data-template-name="query">
	<section id="main">
		{{outlet}}
	</section>
	<section id="queryapp">
		<ul id="query-list">
		  {{#each query in model}}
		    <li>
		      <input type="checkbox" class="toggle">
		      <label>{{query.title}}</label><button class="destroy"></button>
		    </li>
		  {{/each}}
		</ul>
	</section>
	<footer id="info">
		<p>Double-click to edit a todo</p>
	</footer>
  </script>