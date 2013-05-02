var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    builddir: '',
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n * <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @author <%= pkg.author.name %>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n */\n'
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['angular-collection.js'],
        dest: '<%= builddir %><%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          '<%= builddir %><%= pkg.name %>.min.js': ['angular-collection.js']
        }
      }
    },

    jshint: {
      options: {
        eqeqeq: true,
        eqnull: true,
        expr: true,
        globals: {
          angular: true,
          chai: true,
          it: true,
          describe: true,
          module: true,
          inject: true,
          beforeEach: true
        }
      },
      all: ['Gruntfile.js', 'angular-collection.js', 'test/*.js']
    },

    karma: {
      options: {
        configFile: 'test/test-config.js',
        runnerPort: 9999,
        browsers: ['Chrome', 'Firefox']
      },
      ci: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: ['dots']
      }
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });

  grunt.registerTask('default', 'karma:ci');
  grunt.registerTask('build', ['concat', 'uglify']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-conventional-changelog');
};
