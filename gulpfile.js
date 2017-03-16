var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var inline = require('gulp-inline');
var svgmin = require('gulp-svgmin');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(postcss([
    autoprefixer({
      browsers: ['> 0%']
    })
  ]))
  .pipe(cssnano({zindex: false}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('jade', function(){
  return gulp.src('*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('inline', function(){
  return gulp.src('app/*.html')
    .pipe(inline({
      base: 'img/svg',
      disabledTypes: ['js', 'css', 'img'],
      ignore: ['css', 'js', 'fonts']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('svgmin', function () {
  return gulp.src('img/svg/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest('img/svg'));
});

gulp.task('reload', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scripts', function() {
    gulp.src(['js/*.js'])
        // .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('clean:js', function() {
	return del.sync('app/js');
});

gulp.task('images', function(){
	gulp.src('img/*.+(png|jpg|gif)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('app/img'))
});

gulp.task('fonts', function(){
	gulp.src('fonts/*')
		.pipe(gulp.dest('app/fonts'))
});

gulp.task('watch', ['clean:js', 'browserSync', 'jade', 'sass', 'inline', 'scripts', 'svgmin', 'images', 'fonts'], function(){
    gulp.watch('**/*.scss', ['sass']);
    gulp.watch('img/**/*.+(png|jpg|gif|svg)', ['images']);
    gulp.watch('fonts/*', ['fonts']);
    gulp.watch('**/*.jade', function() {
      runSequence('jade', 'svgmin', 'inline', 'reload');
    });
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      index: 'index.html'
    }
  })
});