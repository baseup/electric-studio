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
      main: {
        src: ['app/views/ng-templates/**/*.html'],
        dest: 'assets/js/templates.js'
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

    watch: {
      scripts: {
        files: ['app/views/ng-templates/**/*.html'],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['html2js', 'sass', 'watch']);
}
