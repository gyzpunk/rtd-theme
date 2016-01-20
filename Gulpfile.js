var gulp =  require('gulp');
var sequence =  require('gulp-sequence');
var clean =  require('gulp-clean');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssNano = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components',
  distPath: './dist'
}

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('clean', function() {
  return gulp
    .src(config.distPath, {read: false})
    .pipe(clean())
});

gulp.task('copy', function() {
  return gulp
    .src(config.bowerDir + '/sphinx-rtd-theme/sphinx_rtd_theme/**/*.*')
    .pipe(gulp.dest(config.distPath))
});

gulp.task('css', function() { 
  return gulp
    .src([config.sassPath + '/style.sass', './resources/css/*.css'])
    .pipe(sass({
      includePaths: [
        config.sassPath,
        config.bowerDir + '/sphinx-rtd-theme/sass',
        config.bowerDir + '/wyrm/sass',
        config.bowerDir + '/bourbon/dist',
        config.bowerDir + '/neat/app/assets/stylesheets',
        config.bowerDir + '/font-awesome/scss'
      ]}) 
      .on("error", notify.onError({title: 'Error', message:'<%= error.message %>'}))
    ) 
    .pipe(cssNano())
    .pipe(rename('theme.css'))
    .pipe(sourcemaps.init())
    .pipe(minifyCss({processImport: false, keepSpecialComments: 1}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distPath + '/static/css')); 
});

gulp.task('default', sequence('clean', 'bower', 'copy', 'css'));
