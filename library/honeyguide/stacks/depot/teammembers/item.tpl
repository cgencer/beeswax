{{!isa:ITEM}}
          <div class="col-xs-12 {{columns}}">
            <div class="mt-lg">
              <figure class="team-member">
              {{#attachments}}
                <img src="{{guid}}" alt="attachment for {{post.post_title}}" />
              {{/attachments}}
                <figcaption>
                  <span class="title">
                    <h1 class="mt-none mb-none editable editable_textfield">{{post.post_title}}</h1>
                    <h4 class="mt-none mb-none editable editable_textfield">{{customfields.subtitle}}</h4>
                  </span>
                  <p class="description text-center">
                    <a href="{{customfields.twitter}}" class="text-white editable editable_icon"><i class="fa fa-4x fa-twitter"></i></a>
                    <a href="{{customfields.linkedin}}" class="text-white editable editable_icon"><i class="fa fa-4x fa-linkedin"></i></a>
                    <a href="{{customfields.facebook}}" class="text-white editable editable_icon"><i class="fa fa-4x fa-skype"></i></a>
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
