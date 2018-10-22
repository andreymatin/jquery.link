module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Babel
     */
    babel: {
      options: {
        'sourceMap': false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/jquery.link.js': 'src/jquery.link.js'
        }
      }
    },

    /**
     * Minify JavaScript files with UglifyJS
     */
    uglify: {
      task1: {
        files: {
          'dist/jquery.link.min.js': ['dist/jquery.link.js']
        }
      },
      task2: {
        files: {
          'demo/js/jquery.link.min.js': ['dist/jquery.link.js']
        }
      },
    },

    /**
     * JS Hint
     */
    jshint: {
      options: {
        reporter: require("jshint-stylish"),
        esversion: 6
      },
      target: ['src/jquery.link.js']
    },

    /**
     * Watcher
     */
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      scripts: {
        files: ['src/*.js'],
        tasks: ['jshint', 'babel', 'uglify']
      }
    },

    /**
     * Local server
     */
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'demo',
          hostname: '*'
        }
      }
    },


    karma: {
      unit: {
        configFile: "karma.conf.js",
        background: true,
        singleRun: false
      }
    }

  });

  /**
   * Test
   */
  grunt.registerTask("test", ["karma"]);

  /**
   * Tasks
   */
  grunt.registerTask(
    'build',
    ['jshint', 'babel', 'uglify']
  );

  grunt.registerTask(
    'default',
    ['build', 'connect', 'watch']
  );
};