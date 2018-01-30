var gulp     = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    s3       = require('gulp-s3'),
    shell    = require('gulp-shell'),
    fs       = require('fs'),
    del      = require('del'),
    svgmin   = require('gulp-svgmin');


/* minifying svg files */
gulp.task('minify-svg', function() {
    return gulp.src('./src/images/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./src/images/'));
});

/* publishing site */
gulp.task('delete-build', function() {
  return del([
    'build/'
  ]);
});

gulp.task('build', ['metalsmith']);

gulp.task('metalsmith', ['delete-build'], shell.task([
  'node build.js --exit'
]))

gulp.task('publish', ['build'], function(){
  var aws = JSON.parse(fs.readFileSync('./.aws.json'));

  var options = {
    headers: {'Cache-Control': 'max-age=315360000, no-transform, public'}
  };

  return gulp.src('./build/**')
    .pipe(s3(aws, options));
});
