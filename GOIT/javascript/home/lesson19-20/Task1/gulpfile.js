var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concatCss = require('gulp-concat-css');
var order = require("gulp-order");
var streamqueue = require('streamqueue');

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
		// .pipe(minify())
		.pipe(gulp.dest('dist/css'));

	return mergedStream;
});

gulp.task('images', function() {
	return gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
	.pipe(watch('src/js/*.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	return gulp.watch('src/css/**/*.less', ['css']);
});

gulp.task('default', ['css', 'scripts', 'images', 'watch']);