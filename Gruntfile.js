module.exports = function( grunt ) {

  grunt.initConfig({

    //Grab your frontend bower components
    bower: {
      install: {
        options:{
          targetDir: './public/libs',
          cleanup: true,
          install: true
        }
      }
    },

    //Package js into one file using the excellent require
    requirejs: {
      compile: {
        options: {
          baseUrl: "app/assets/scripts",
          mainConfigFile: "app/assets/scripts/config.js",
          out: "public/scripts/main.js",
          name: "main",
          inlineText: false,
          optimize: "none",
          uglify: {
              //toplevel: true,
              //ascii_only: true,
              //beautify: true
          }
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          cssDir: 'public/css',
          sassDir: 'app/assets/styles',
          imagesDir: 'public/images',
          javascriptsDir: 'public/scripts',
          outputStyle: 'expanded',
          force: true
        }
      }
    },

    // // specifying JSHint options and globals
    // // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        'curly': true,
        'eqeqeq': true,
        'immed': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'sub': true,
        'undef': true,
        'boss': true,
        'eqnull': true,
        'browser': true,
        'jquery': true,
        'globals': {
          'jQuery': true,
          '$': true,
          'require': true,
          'define': true,
          'module': true
        }
      },
      files: [
        'Gruntfile.js',
        'app/assets/scripts/**/*.js'
      ]
    },

    // default watch configuration
    watch: {
      compass: {
        files: [
          'app/assets/styles/**/*.{scss,sass}'
        ],
        tasks: ['compass']
      },
      jshint: {
        files: [
          'app/assets/scripts/**/*.js'
        ],
        tasks: ['jshint', 'requirejs']
      }
    },

    //production ready
    uglify: {
      options: {
      },
      my_target: {
        files: {
          'public/scripts/main.js': ['public/scripts/main.js']
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'public/css/main.css': ['public/css/*.css']
        }
      }
    }
  });


  //Load the npm tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default grunt task to be run by node when the app starts in dev
  grunt.registerTask('default', ['compass', 'jshint', 'requirejs', 'watch']);

  //To install and update components run $ grunt setapp
  grunt.registerTask('setapp', ['bower']);

  //Ready app for production
  grunt.registerTask('production', ['compass','requirejs', 'uglify', 'cssmin']);

};
