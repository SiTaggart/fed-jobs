require([
  // Deps
  'backbone',

  // Application.
  "app",

  // Main Router.
  "router"
],

function(Backbone, app, Router) {

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();


});
