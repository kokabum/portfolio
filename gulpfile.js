var gulp = require('gulp');
var concat = require('gulp-concat-css');
var jade = require('gulp-jade');
var sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob');
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');



// default
  gulp.task('default', function() {
    'jade',
    'sass',
    'minify',
    'copy',
    'serve',
    'watch'
    });

// watcher
gulp.task('watch', function() {
  gulp.watch('source/sass/app.sass', ['sass']);
  gulp.watch('source/jade/*.jade', ['jade']);
});


// gulp-concat-css
gulp.task('concatCSS', function() {
  gulp.src('app/css/**/*.css')
  	.pipe(concat('main.css'))
  	.pipe(gulp.dest('app/'));
});


// gulp-jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('source/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      //pretty: '\t',
    }))
    .pipe(gulp.dest('app/'))
});


// gulp-sass
gulp.task('sass', function () {
  return gulp.src('source/sass/app.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// minify
gulp.task('minify', function () {
  gulp.src('app/css/app.css')
    .pipe(cssmin())
    .pipe(gulp.dest('app/css/'));
});

// copy
gulp.task('copy', function() {
  gulp.src('source/img/**/')
    .pipe(gulp.dest('app/img/'));
  gulp.src('source/fonts/**/*')
    .pipe(gulp.dest('app/fonts/'));
  gulp.src('source/js/*')
    .pipe(gulp.dest('app/js/'));
});


//  gulp-autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src('src/app.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});


// gulp-svg-sprite
gulp.task('svgSpriteBuild', function() {
// Basic configuration example
    var config = {
      mode: {
        symbol: {
          dest: './',     //base directory
          sprite: 'app/img/svg-sprite',          //Sprite location
          render: {
            scss: {
              dest: 'app/css/common/svg-sprite', //CSS stylesheet location
            }
          }
        }
      }
    };
    return gulp.src('./source/icons/*.svg')
    .pipe(svgSprite(config))
      .pipe(gulp.dest('./'));
  });


// browser-sync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch('source/sass/app.sass', ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

/*gulp.task('svgSpriteBuild', function () {
  return gulp.src('./source/icons/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "source/img/svg-sprite",
          render: {
            scss: {
              dest:'./',
              template: "source/sass/_sprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./'));
});*/
