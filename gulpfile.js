const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function minifyCSS() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function transpileAndUglifyJS() {
  return gulp.src('src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function copyHTML() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
}

exports.default = function() {
  gulp.watch('src/css/*.css', minifyCSS);
  gulp.watch('src/js/*.js', transpileAndUglifyJS);
  gulp.watch('src/index.html', copyHTML);
  minifyCSS();
  transpileAndUglifyJS()
  copyHTML();
  sync();
};
