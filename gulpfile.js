var gulp = require('gulp');
var concat = require('gulp-concat-css');
var sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob');
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

// gulp-concat-css
gulp.task('cssConcat', function() {
  gulp.src('app/css/**/*.css')
  	.pipe(concat('main.css'))
  	.pipe(gulp.dest('app/'));
});

gulp.task('watch', function() {
	gulp.watch('css/*.css', ['cssConcat'])
});

// gulp-sass
gulp.task('sass', function () {
  return gulp.src('assets/sass/main.scss')
  	.pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
});


// gulp-svg-sprite
gulp.task('svgSpriteBuild', function() {
// Basic configuration example
    var config = {
      mode: {
        symbol: {
          dest: './',     //base directory
          sprite: 'assets/img/svg-sprite',          //Sprite location
          render: {
            scss: {
              dest: 'assets/css/common/svg-sprite', //CSS stylesheet location
            }
          }
        }
      }
    };
    return gulp.src('assets/icons/*.svg')
      .pipe(gulp.dest('app/img/icons'));
  });