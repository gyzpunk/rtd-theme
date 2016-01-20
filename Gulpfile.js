var gulp =  require('gulp')
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css')


var config = {
  bowerDir: './bower_components',
  distPath: './dist'
}

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('copy', function() {
  return gulp
    .src('./bower_components/sphinx-rtd-theme/sphinx_rtd_theme/**/*.*')
    .pipe(gulp.dest(config.distPath))
});

gulp.task('default', ['bower', 'copy']);
