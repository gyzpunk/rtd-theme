var gulp =  require('gulp')
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css')


var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components',
  distPath: './dist'
}

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('copy', function() {
  return gulp
    .src(config.bowerDir + '/sphinx-rtd-theme/sphinx_rtd_theme/**/*.*')
    .pipe(gulp.dest(config.distPath))
});

gulp.task('css', function() { 
  return gulp.src([config.sassPath + '/style.scss', './resources/css/*.css'])
    .pipe(sass({
      includePaths: [
        config.sassPath,
        config.bowerDir + '/sphinx-rtd-theme/sass'
      ]}) 
      .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
      }))
    ) 
    .pipe(concatCss('bundle.css'))
    .pipe(sourcemaps.init())
    .pipe(minifyCss({processImport: false, keepSpecialComments: 1}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.distDir + '/css')); 
});

gulp.task('default', ['bower', 'copy', 'css']);
