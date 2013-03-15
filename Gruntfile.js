module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    nodeunit: {
      all: ['test/**/*.js']
    }
  });

  // Load dependency tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
