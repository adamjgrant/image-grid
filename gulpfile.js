var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    sync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css')

gulp.task('jade', function() {
  return gulp.src(['./lib/**/[^_]*.jade'])
    .pipe(jade({ pretty: '  ' }))
    .pipe(gulp.dest('dist'));
})

gulp.task('sass', function() {
  return sass('./lib/style.sass')
    .pipe(minify())
    .pipe(gulp.dest('dist'));
})

gulp.task('js', function() {
  return gulp.src([
      './lib/**/*.js'
    ])
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('sync', function() {
  return sync.init(['./dist'], {
    server: {
      baseDir: ['dist', 'lib']
    }
  });
});

gulp.task('uncompiled', function() {
  return gulp.src([
    './lib/*.gif',
    './node_modules/mocha/mocha.js',
    './node_modules/mocha/mocha.css',
    './node_modules/should/should.min.js',
    './node_modules/chai/chai.js'
  ])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['sync'], function() {
  gulp.watch('./lib/**/*.jade', ['jade']);
  gulp.watch('./lib/**/*.sass', ['sass']);
  gulp.watch('./lib/**/*.js', ['js']);
});

gulp.task('default', ['build', 'watch']);

gulp.task('build', [
  'jade',
  'sass',
  'js',
  'uncompiled'
]);
