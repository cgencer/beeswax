{{!isa:ITEM}}
<div class="row" style="padding:4px;">
	<div class="col-md-8">
		<div class="input-group">
			<div class="input-group-btn">
				<span class="dropdown ddLeft">
					<button type="button" class="btn btn-default btn-xs dropdown-toggle" id="dMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Content-type <span class="caret"></span></button>
					<ul class="dropdown-menu" aria-labelledby="dMenu1">
						{{#left}}
						<li><a href="#" class="type_{{item.type}}" alt="{{item.values}}">{{item.label}}{{#item.required}} (*){{/item.required}}</a></li>
						{{/left}}
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
		</div><!-- /btn-group -->
	</div><!-- /input-group -->
	<div class="col-md-4 text-right pull-right">
		<div class="btn-group">
			<a href="#" class="btn btn-default btn-xs">on</a>
			<a href="#" class="btn btn-default btn-xs">off</a>
		</div>
		<a id="addLiner" class="btn btn-primary btn-xs oneLinerButton">+</a>
	</div>
</div>
