var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    pug  = require('gulp-pug'),
    image = require('gulp-image'),
    browserSync = require('browser-sync').create()

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('pug', function() {
  return gulp.src('src/pug/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
  .pipe(sass({
    // outputStyle: 'compressed'
  }))
  .pipe(gulp.dest('build/css'))
});

gulp.task('image', function (done) {
  gulp.src('src/img/*')
    .pipe(image())
    .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('watch', function() {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/img/*', gulp.series('image'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  browserSync.watch('build', browserSync.reload)
});

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'sass', 'image'),
  gulp.parallel('watch', 'serve')
));

