var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concatCss = require('gulp-concat-css');
var order = require("gulp-order");
var streamqueue = require('streamqueue');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('css', function(){
	var cssStream = gulp.src('src/css/*.css')
		.pipe(order(["reset.css",
					 "fonts.css"]))
		.pipe(concatCss("default.css"));

	var lessStream = gulp.src('src/css/**/*.less')
		.pipe(less())
		.on('error', gutil.log);

	var mergedStream = streamqueue({ objectMode: true }, cssStream, lessStream)
		.pipe(concatCss('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 10 versions', '> 2%'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'));

	return mergedStream;
});

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
	.pipe(concat('script.js'))
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
	return gulp.src('src/img/*.*')
	.pipe(imagemin({
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
	return gulp.watch('src/css/**/*.less', ['css']);
});

gulp.task('default', ['css', 'scripts', 'images', 'fonts', 'watch']);