var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var streamqueue = require('streamqueue');
var watch = require('gulp-watch');

gulp.task('css', function(){
	var cssStream = gulp.src('src/css/*.css');
		// .pipe(order(["reset.css"]))
		// .pipe(concatCss("default.css"));
		// .pipe("default.css");

	var lessStream = gulp.src('src/css/**/*.less')
		.pipe(less());

	var mergedStream = streamqueue({ objectMode: true }, cssStream, lessStream)
		.pipe(concatCss('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 10 versions', '> 2%'],
			cascade: false
		}))
		// .pipe(cssnano())
		// .pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'));

	return mergedStream;
});

gulp.task('watch', function() {
	return gulp.watch('src/css/**/*.less', ['css']);
});


gulp.task('default', ['css', 'watch']);