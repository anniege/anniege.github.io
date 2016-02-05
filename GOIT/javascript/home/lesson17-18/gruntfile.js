module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
    all: ['gruntfile.js', 'js/*.js']
  },
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['js/jquery.acarousel.js', 'js/script.js'],
      dest: 'public/js/script.min.js',
    },
  },
  uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'public/js/script.min.js': ['public/js/script.min.js']
      }
    }
  },
  cssmin: {
    options: {
      shorthandCompacting: false,
      roundingPrecision: -1
    },
    target: {
      files: {
        'public/css/style.css': ['css/reset.css', 'css/style1.css', 'css/style2.css']
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
};