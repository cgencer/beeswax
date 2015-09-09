import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("post", { path: '/post/:post_id' });
  this.route('posts', function() {
  	this.route('by_type', { path: '/:post_type' });
  });
});

export default Router;
