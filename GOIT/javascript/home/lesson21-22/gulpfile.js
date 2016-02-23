"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('babel', () => {
	return gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['babel']);