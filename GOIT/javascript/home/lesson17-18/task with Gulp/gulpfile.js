var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');


gulp.task('css', function () {
	return gulp.src('css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(concatCss('css/style.css'))
		.pipe(cssnano())
		.pipe(rename('css/style.min.css'))
		.pipe(gulp.dest('public'));
});


gulp.task('default', ['css']);