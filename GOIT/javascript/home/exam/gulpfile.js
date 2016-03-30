var	gulp = require('gulp'),
	gutil = require('gulp-util'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	concatCss = require('gulp-concat-css'),
	rigger = require('gulp-rigger'),
	order = require("gulp-order"),
	streamqueue = require('streamqueue'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	spritesmith = require('gulp.spritesmith'),
	buff = require('vinyl-buffer'),
	merge = require('merge-stream');

gulp.task('build:css', function(){
	var cssStream = gulp.src('src/css/*.css')
	.pipe(order(["reset.css",
		"fonts.css"]))
	.pipe(concatCss("default.css"))
	.on('error', function(e){
		console.log(e);
	});

	var lessStream = gulp.src('src/css/less/style.less')
	.pipe(less({
		paths: ['src/css/less']
	}))
	.on('error', function(e){
		console.log(e);
	});

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

gulp.task('build:scripts', function(){
	return gulp.src('src/js/app.js')
	.pipe(rigger())
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('build:vendor', function(){
	return gulp.src('src/js/vendor.js')
	.pipe(rigger())
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('build:images', function() {
	return gulp.src('src/img/*.*')
	.pipe(imagemin({
		progressive: true,
		use: [pngquant({quality: '65-80', speed: 4})],
		interlaced: true
	}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('build:sprites', function () {
	var spriteData = gulp.src('src/img/sprites/*.png').pipe(spritesmith({
		imgName: 'partner_sprite.png',
		cssName: 'partner_sprite.css',
		imgPath: '../img/partner_sprite.png',
		padding: 17,
		algorithm: 'left-right'
	})).on('error', function(e){
		console.log(e);
	});

	var imgStream = spriteData.img
	.pipe(buff())
	.pipe(imagemin({
		progressive: true,
		use: [pngquant({quality: '65-80', speed: 4})],
		interlaced: true
	}))
	.pipe(gulp.dest('dist/img'));

	var cssStream = spriteData.css
	.pipe(gulp.dest('src/css'));

	return merge(imgStream, cssStream);
});

gulp.task('build:fonts', function() {
	return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('less:watch', function() {
	return gulp.watch('src/css/**/*.less', ['build:css']);
});

gulp.task('js:watch', function() {
	return gulp.watch('src/js/**/*.js', ['build:scripts']);
});

gulp.task('default', [
	'build:images',
	'build:sprites',
	'build:fonts',
	'build:css',
	'build:vendor',
	'build:scripts',
	// 'less:watch',
	// 'js:watch'
	]);



