var gulp = require('gulp');
var concat = require('gulp-concat-css');
var jade = require('gulp-jade');
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
  gulp.watch('source/sass/app.sass', ['sass']);
  gulp.watch('source/jade/*.jade', ['jade']);
});

// gulp-jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('source/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: '\t',
    }))
    .pipe(gulp.dest('app/'))
});

// gulp-sass
gulp.task('sass', function () {
  return gulp.src('source/sass/app.sass')
  	.pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('source/sass/**/*.sass', ['sass']);
});


// gulp-svg-sprite
gulp.task('svgSpriteBuild', function() {
// Basic configuration example
    var config = {
      mode: {
        symbol: {
          dest: './',     //base directory
          sprite: 'source/img/svg-sprite',          //Sprite location
          render: {
            scss: {
              dest: 'source/css/common/svg-sprite', //CSS stylesheet location
            }
          }
        }
      }
    };
    return gulp.src('./source/icons/*.svg')
    .pipe(svgSprite(config))
      .pipe(gulp.dest('./'));
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
