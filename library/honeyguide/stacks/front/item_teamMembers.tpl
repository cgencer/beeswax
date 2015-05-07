          <div class="col-xs-12 {{columns}}">
            <div class="mt-lg">
              <figure class="team-member">
              {{#attachments}}
                <img src="{{guid}}" alt="attachment for {{post_title}}" />
              {{/attachments}}
                <figcaption>
                  <span class="title">
                    <h1 class="mt-none mb-none">{{post_title}}</h1>
                    {{#cfields.subtitle}}<h4 class="mt-none mb-none">{{cfields.subtitle}}</h4>{{/cfields.subtitle}}
                  </span>
                  <p class="description text-center">
                    {{#cfields.twitter}}<a href="#" class="text-white">
                    <i class="fa fa-4x fa-twitter">{{cfields.twitter}}</i></a>{{/cfields.twitter}}
                    {{#cfields.linkedin}}<a href="#" class="text-white">
                    <i class="fa fa-4x fa-linkedin">{{cfields.linkedin}}</i></a>{{/cfields.linkedin}}
                    {{#cfields.facebook}}<a href="#" class="text-white">
                    <i class="fa fa-4x fa-skype">{{cfields.facebook}}</i></a>{{/cfields.facebook}}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
