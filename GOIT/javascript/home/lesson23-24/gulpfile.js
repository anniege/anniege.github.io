var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var streamqueue = require('streamqueue');
var watch = require('gulp-watch');

gulp.task('less', function() {
	return gulp.src('src/css/LESS/*.less')
	.pipe(less())
	.pipe(autoprefixer({
		browsers: ['last 10 versions', '> 2%'],
		cascade: false
	}))
	.pipe(gulp.dest('src/css'));
});


gulp.task('watch', function() {
	return gulp.watch('src/css/**/*.less', ['css']);
});

gulp.task('default', ['less', 'watch']);