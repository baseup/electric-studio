'use strict';

/* global module */

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    html2js: {
      options: {
        module: 'elstudio.templates',
        singleModule: true,
        base: '.',
        rename: function (name) {
          return name.replace('app/views/ng-templates', '')
            .replace('.html', '');
        },
        htmlmin: {
          collapseWhitespace: true
        }
      },
      site: {
        src: ['app/views/ng-templates/site/**/*.html'],
        dest: 'assets/js/dist/app/templates.js'
      },
      admin: {
        src: ['app/views/ng-templates/admin/**/*.html'],
        dest: 'assets/js/dist/admin/templates.js'
      }
    },

    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          cacheLocation: 'assets/sass/.sass-cache/',
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['**/*.scss', '**/*.sass', '**/!_*.scss', '**/!_*.sass'],
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    },

    concat: {
      appCtrls: {
        options: {
          banner: "var ctrls = angular.module('elstudio.controllers.site', ['elstudio.services']);"
        },
        src: ['assets/js/src/app/ctrls/**/*.js'],
        dest: 'assets/js/src/app/controllers.js'
      }
    },

    uglify: {
      dist: {
        options: {
          mangle: false
        },
        files: [{
          expand: true,
          cwd: 'assets/js/src/',
          src: ['**/*.js', '!**/ctrls/*.js'],
          dest: 'assets/js/dist'
        }]
      }
    },

    watch: {
      scripts: {
        files: ['app/views/ng-templates/**/*.html'],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: ['assets/sass/**/*.scss', 'assets/sass/**/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['html2js', 'concat', 'uglify', 'sass', 'watch']);
  grunt.registerTask('build', ['html2js', 'concat', 'uglify', 'sass']);
}
