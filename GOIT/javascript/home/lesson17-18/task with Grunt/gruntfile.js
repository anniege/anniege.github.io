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
		dist: {
			files: {
				'public/js/script.min.js': ['public/js/script.min.js']
			}
		}
	},
	autoprefixer: {
			options: {
				browsers: ['last 10 versions', 'ie 8', '> 1%']
			},
     		multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/temp'
            }
	 },
	cssmin: {
		options: {
			shorthandCompacting: false,
			roundingPrecision: -1
		},
		target: {
			files: {
				'public/css/style.min.css': ['css/temp/reset.css', 'css/temp/style1.css', 'css/temp/style2.css']
			}
		}
	},
	imagemin: {
		static: {
			options: {
				progressive: true,
				interlaced: true
			},
			files: [
				{
					expand: true,
					cwd: 'img/',
					src: ['*.{jpg,gif}'],
					dest: 'public/img/',
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