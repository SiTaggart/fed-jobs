// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../../../public/libs/js",
    plugins: "plugins",

    // Libraries.
    jquery: "../../../public/libs/js/jquery/jquery.min",
    lodash: "../../../public/libs/js/lodash/lodash.min",
    backbone: "../../../public/libs/js/backbone/backbone-min"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    }
  }

});
