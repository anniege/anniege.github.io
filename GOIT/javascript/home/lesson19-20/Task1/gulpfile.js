"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');

gulp.task('css', function(){
	return gulp.src('src/less/*.less')
	.pipe(watch('src/less/*.less'))
	.pipe(less())
	.pipe(gulp.dest('public/css'));
});


gulp.task('default', ['css']);