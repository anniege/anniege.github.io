'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('css', function () {
	return gulp.src('css/*.css')
	.pipe(autoprefixer({
		browsers: ['last 10 versions', '> 2%'],
		cascade: false
	}))
	.pipe(concatCss('css/style.css'))
	.pipe(cssnano())
	.pipe(rename('css/style.min.css'))
	.pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename('js/script.min.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('images', function(){
	return gulp.src('img/*')
	.pipe(imagemin({
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest('public/img'));
});


gulp.task('default', ['css', 'scripts', 'images']);