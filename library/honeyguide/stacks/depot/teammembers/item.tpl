{{!isa:ITEM}}
          <div class="col-xs-12 {{attributes.columns}}">
            <div class="mt-lg">
              <figure class="team-member">
              {{#attributes.attachments}}
                <img src="{{guid}}" alt="attachment for {{post.post_title}}" />
              {{/attributes.attachments}}
                <figcaption>
                  <span class="title">
                    <h1 class="mt-none mb-none">{{post.post_title}}</h1>
                    <h4 class="mt-none mb-none">{{attributes.cfield.subtitle}}</h4>
                  </span>
                  <p class="description text-center">
                    <a href="{{attributes.cfield.twitter}}" class="text-white"><i class="fa fa-4x fa-twitter"></i></a>
                    <a href="{{attributes.cfield.linkedin}}" class="text-white"><i class="fa fa-4x fa-linkedin"></i></a>
                    <a href="{{attributes.cfield.facebook}}" class="text-white"><i class="fa fa-4x fa-skype"></i></a>
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
