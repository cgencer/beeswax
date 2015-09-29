import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("/");
  this.route("post", { path: '/post/:post_id' });
  this.resource('posts', function() {
  	this.route('by_type', { path: '/by_type/:post_type' });
  	this.route('by_type', { path: '/by_type/:post_type/:test' });
  });
});

export default Router;
