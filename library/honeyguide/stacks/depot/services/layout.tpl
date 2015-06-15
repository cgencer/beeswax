{{!isa:COLLECTION}}
      {{#set.global}}
      <section class="container mt-xxxlg">
        <div class="row">
          <div class="col-xs-12">
            {{! also available directly (w/o #set.global loop) trough 'global.strings.title'}}
            <h2 class="lead text-center text-primary">{{strings.title}}</h2>
          </div>
        </div>
        <div class="row">
		{{{content}}}
        </div>
      </section>
      {{/set.global}}
