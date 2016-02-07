module.exports = function(grunt) {

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
	autoprefixer: {
			options: {
				browsers: ['last 8 versions', 'ie 8']
			},
			files: {
				'css/*.css': 'css/modified/*.css'
			}
	 },
	cssmin: {
		options: {
			shorthandCompacting: false,
			roundingPrecision: -1
		},
		target: {
			files: {
				'public/css/style.min.css': ['css/reset.css', 'css/style1.css', 'css/style2.css']
			}
		}
	},
	imagemin: {
		jpg: {
			options: {
				progressive: true
			},
			files: [
				{
					expand: true,
					cwd: 'img/',
					src: ['*.jpg'],
					dest: 'public/img/',
					ext: '.jpg'
				}
			]
		}
	}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'imagemin']);
};