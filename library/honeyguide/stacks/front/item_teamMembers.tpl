          <div class="col-xs-12 {{columns}}">
            <div class="mt-lg">
              <figure class="team-member">
              {{#attachments}}
                <img src="{{guid}}" alt="attachment for {{post.post_title}}" />
              {{/attachments}}
                <figcaption>
                  <span class="title">
                    <h1 class="mt-none mb-none">{{post.post_title}}</h1>
                    {{#cfield.subtitle}}<h4 class="mt-none mb-none">{{cfield.subtitle}}</h4>{{/cfield.subtitle}}
                  </span>
                  <p class="description text-center">
                    <a href="#" class="text-white">
                    <i class="fa fa-4x fa-twitter">{{cfield.twitter}}</i></a>
                    <a href="#" class="text-white">
                    <i class="fa fa-4x fa-linkedin">{{cfield.linkedin}}</i></a>
                    <a href="#" class="text-white">
                    <i class="fa fa-4x fa-skype">{{cfield.facebook}}</i></a>
                  </p>
                </figcaption>{{cfield.facebook}}
              </figure>
            </div>
          </div>
