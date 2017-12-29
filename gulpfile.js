var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uncss = require('gulp-uncss'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	svgSprite = require('gulp-svg-sprites'),
	twig = require('gulp-twig'),
	gp = require('gulp-path'),
	gulpSrcFiles = require('gulp-src-files'),
	rigger = require('gulp-rigger'),
	flatten = require('gulp-flatten'),
	merge = require('merge-stream'),
	buffer = require('vinyl-buffer'),
	babel = require('gulp-babel'),
	debug = require('gulp-debug');

// browser
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
});

// sass
gulp.task('sass', function () {
	return gulp.src('app/css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});
// en
gulp.task('sassEN', function () {
	return gulp.src('app/en/css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/en/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

// min css
gulp.task('css:min', function () {
	return gulp.src('dist/assets/css/main.css')
	pipe(uncss({
		html: ['dist/**/*.html']
	}))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

// libs js
gulp.task('js:libs', function () {
	gulp.src([
		// lib core
		'bower_components/jquery/dist/jquery.min.js',
		// lib add
		'bower_components/jquery.easing/js/jquery.easing.min.js',
		'bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
		'bower_components/jquery-touchswipe/jquery.touchSwipe.min.js',
		
		// scripts
		'bower_components/select2/dist/js/select2.min.js',
		'bower_components/dropzone/dist/dropzone.js',
		'bower_components/owl.carousel/dist/owl.carousel.min.js',
		'bower_components/bPopup/jquery.bpopup.min.js',
		'bower_components/jRange/jquery.range-min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js/'));
});
// en
gulp.task('jsEN:libs', function () {
	gulp.src([
		// lib core
		'bower_components/jquery/dist/jquery.min.js',
		// lib add
		'bower_components/jquery.easing/js/jquery.easing.min.js',
		'bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
		'bower_components/jquery-touchswipe/jquery.touchSwipe.min.js',
		
		// scripts
		'bower_components/select2/dist/js/select2.min.js',
		'bower_components/dropzone/dist/dropzone.js',
		'bower_components/owl.carousel/dist/owl.carousel.min.js',
		'bower_components/bPopup/jquery.bpopup.min.js',
		'bower_components/jRange/jquery.range-min.js',
		'bower_components/masonry/dist/masonry.pkgd.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/en/assets/js/'));
});

// main js
gulp.task('js:main', function () {
	gulp.src('app/js/*.js')
	.pipe(babel({
		presets: ["es2015"]
	}))
	.pipe(gulp.dest('dist/assets/js/'))
	.pipe(browserSync.reload({stream:true}));
});
// en
gulp.task('jsEN:main', function () {
	gulp.src('app/en/js/*.js')
	.pipe(babel({
		presets: ["es2015"]
	}))
	.pipe(gulp.dest('dist/en/assets/js/'))
	.pipe(browserSync.reload({stream:true}));
});

// SVG Task
gulp.task('sprite', function () {
	return gulp.src('app/img/icons/**/*.svg')
	.pipe(svgSprite({
		cssFile: "../../app/css/_sprite.scss",
		preview: false,
		templates: { scss: true },
		svg: { sprite: "img/sprite.svg" }
	}))
	.pipe(gulp.dest('dist/assets'));
});
// en
gulp.task('spriteEN', function () {
	return gulp.src('app/en/img/icons/**/*.svg')
	.pipe(svgSprite({
		cssFile: "../../../app/en/css/_sprite.scss",
		preview: false,
		templates: { scss: true },
		svg: { sprite: "img/sprite.svg" }
	}))
	.pipe(gulp.dest('dist/en/assets'));
});

// html builder
// gulp.task('html:build', function () {
// 	gulp.src('app/views/**/*.html')
// 	.pipe(rigger())
// 	.pipe(browserSync.reload({stream: true}));
// });

// var app = new gp.Path('app', 'dist');
// var views = app.generateAllPaths('views/', '', '', 'twig');
// var input = gp.generateBlob('app', 'components', '*', 'sass');
// var output = gp.generateBlob('dist', '**', '*', null);


gulp.task('twig:build', function () {

    return gulp.src('app/views/*/*.html.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            },
            functions: [
            	{
            		name: 'asset',
            		func: function (url) {
				        return 'assets/' + url;
				    }
            	},
            	{
            		name: 'path',
            		func: function (link,sublink) {
				        return link + '.html'; 
				    }
            	}
            ]
        }))
        .pipe(rename(function (path) {
        	var dir = path.dirname,
        		name = path.basename;
	        	
        	path.basename = dir + '_' + name;
    		path.extname = '';
        }))
        .pipe(flatten())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('twigEN:build', function () {

    return gulp.src('app/en/views/*/*.html.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            },
            functions: [
            	{
            		name: 'asset',
            		func: function (url) {
				        return 'assets/' + url;
				    }
            	},
            	{
            		name: 'path',
            		func: function (link,sublink) {
				        return link + '.html'; 
				    }
            	}
            ]
        }))
        .pipe(rename(function (path) {
        	var dir = path.dirname,
        		name = path.basename;
	        	
        	path.basename = dir + '_' + name;
    		path.extname = '';
        }))
        .pipe(flatten())
        .pipe(gulp.dest('dist/en'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('twig:index', function () {

    return gulp.src('app/views/index.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            },
            functions: [
            	{
            		name: 'asset',
            		func: function (url) {
				        return 'assets/' + url;
				    }
            	},
            	{
            		name: 'path',
            		func: function (link,sublink) {
				        return link + '.html'; 
				    }
            	}
            ]
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', ['twig:build', 'twig:index', 'js:libs', 'js:main', 'sprite', 'browser-sync', 'sass'], function () {
	gulp.watch('app/**/*.scss', ['sass']);
	// gulp.watch('app/**/*.html', ['html:build']);
	gulp.watch('app/views/*/*.html.twig', ['twig:build']);
	gulp.watch('app/en/views/*/*.html.twig', ['twigEN:build']);
	gulp.watch('app/views/index.twig', ['twig:index']);
	gulp.watch('app/img/icons/svg/*.svg', ['sprite', 'sass']);
	gulp.watch('app/js/*.js', ['js:main']);
});

// EN версия
gulp.task('watchEN', ['twigEN:build', 'jsEN:libs', 'jsEN:main', 'spriteEN', 'browser-sync', 'sassEN'], function () {
	gulp.watch('app/en/**/*.scss', ['sassEN']);
	// gulp.watch('app/**/*.html', ['html:build']);
	gulp.watch('app/en/views/*/*.html.twig', ['twigEN:build']);
	gulp.watch('app/en/tpl/*/*.html.twig', ['twigEN:build']);
	gulp.watch('app/en/img/icons/svg/*.svg', ['spriteEN', 'sassEN']);
	gulp.watch('app/en/js/*.js', ['jsEN:main']);
});