'use strict';

// Theme name
const themeName = 'gescoiiar';

// Gulp plugins
const	gulp = require("gulp");
const	plumber = require("gulp-plumber");
const   gulpsass = require('gulp-sass')(require('sass'));
const	autoprefixer = require("gulp-autoprefixer");
const	cleanCss = require("gulp-clean-css");
const	sourceMaps = require("gulp-sourcemaps");
const	concat = require("gulp-concat");
const	jshint = require("gulp-jshint");
const	uglify = require("gulp-uglify");
const   htmlInclude = require('gulp-html-tag-include');
const	browserSync = require('browser-sync').create();
const	reload = browserSync.reload;
const	svgmin = require("gulp-svgmin");
const	svgstore = require ("gulp-svgstore");
const	cheerio = require ("gulp-cheerio");
const 	zip = require('gulp-zip');

var onError = function(err)	{
	console.log("Se ha producido un error: ", err.message);
	this.emit("end");
};


// Paths
const devPaths = {
	sass: './dev/sass/',
	js: './dev/js/',
	img: './dev/img/',
	icons: './dev/icons/',
  html: './dev/html/',
};

const distPaths = {
    html: './public/',
    js: './public/assets/js/',
  	img: './public/assets/img/',
  	icons: './public/assets/icons/',
  	styles: './public/assets/styles/',
  };

// Files to watch
const watchFiles = {
	sass: './dev/sass/**/*',
	js: './dev/js/**/*',
	img: './dev/img/**/*.*',
	icons: './assets/icons/*.svg',
	html: './dev/html/**/*',
};

// Browser Sync proxy direction
const proxySync = 'localhost:8888/' + themeName;


// Gulp TASK
gulp.task("sass", function(){
	return gulp.src(devPaths.sass + 'main.scss')
		.pipe(plumber({errorHandler:onError}))
		.pipe (sourceMaps.init())
		.pipe (gulpsass())
		.pipe(autoprefixer({
				overrideBrowserslist: ['last 2 versions'],
				grid: true
			}))
		
		.pipe (cleanCss({keepSpecialComments: 1}))
		.pipe (sourceMaps.write("."))
		.pipe (gulp.dest(distPaths.styles))
		.pipe(reload({stream:true}));
				
});


gulp.task('html', function () {
  return gulp.src(devPaths.html + '*.html')
    .pipe(plumber({errorHandler:onError}))
    .pipe(htmlInclude({
      basePath: (devPaths.html + '/partials/' ),
    }))
    .pipe (gulp.dest(distPaths.html));
});

gulp.task("javascript", function(){
	return gulp.src(devPaths.js + '**/*.js')
		.pipe(plumber({errorHandler:onError}))
		.pipe(jshint())
		.pipe (concat(themeName + '.min.js'))
		.pipe (uglify())
		.pipe (gulp.dest(distPaths.js));
		
});

gulp.task('icons', function () {
  return gulp.src(devPaths.icons + 'sprite-icons/*.svg')
    .pipe(plumber({errorHandler:onError}))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: false
    }))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').addClass('hide-svg');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(distPaths.icons));
	
});

// Browser Sync
gulp.task('browser-sync', function() {
	var files = [
		"dev/**/*",
    '**/*.html',
		'**/*.{png,jpg,gif,svg}',
		{
			match: ["**/*.php"],
			fn:    function (event, file) {
					/** Custom event handler **/
			}
		}
	];
	browserSync.init(files, {
		proxy: proxySync,
		liveReload: false,
		watch: true,
		open: false,
		browser: ["google chrome", "firefox"],
		injectChanges: false
		
	});
});


// Zip files up
gulp.task('build', function () {
	return gulp.src([
	  './public/**/*',
	  '!dev',
	  '!dist',
	  '!.gitignore',
	  '!.package.json',
	  '!.package-lock.json',
	  '!./node_modules',
	  '!./README.md'
	 ], {base: "."})
	 .pipe(zip(themeName + '.zip'))
	 .pipe(gulp.dest('./dist'));
   });


// Gulp watching where magic happen
gulp.task( 'watch', function() {
 
	// don't listen to whole js folder, it'll create an infinite loop
	gulp.watch( watchFiles.js, gulp.parallel('javascript') );
	gulp.watch( watchFiles.sass, gulp.parallel('sass') );
	gulp.watch( watchFiles.html, gulp.parallel('html') );
   
  } );
   
  gulp.task( 'default', gulp.parallel('watch', 'browser-sync'));
