var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    sync = require('browser-sync');

gulp.task('jade', function() {
  return gulp.src(['./lib/**/[^_]*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('dist'));
})

gulp.task('sass', function() {
  return sass('./lib/style.sass')
    .pipe(gulp.dest('dist'));
})

gulp.task('uncompiled', function() {
  return gulp.src([
      './lib/**/*.js'
    ])
    .pipe(gulp.dest('dist'));
})

gulp.task('sync', function() {
  sync.init(['./dist'], {
    server: {
      baseDir: ['dist', 'lib']
    }
  });
});

gulp.task('watch', ['sync'], function() {
  gulp.watch('./lib/**/*.jade', ['jade']);
  gulp.watch('./lib/**/*.sass', ['sass']);
  gulp.watch('./lib/**/*.js', ['uncompiled']);
});

gulp.task('default', ['jade', 'sass', 'uncompiled', 'watch'], function() {});

gulp.task('test', function() {

});
