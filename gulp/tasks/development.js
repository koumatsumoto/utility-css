const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpRename = require('gulp-rename');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpStylint = require('gulp-stylint');
const gulpStylus = require('gulp-stylus');
const path = require('path');
const CONSTANTS = require('../constants');
const PROJECT_ROOT = CONSTANTS.PROJECT_ROOT;
const SRC_ROOT = CONSTANTS.SRC_ROOT;
const DIST_ROOT = CONSTANTS.DIST_ROOT;



/**
 * Task for lint all stylus files before transpile
 */
gulp.task('dev:styl:lint', () => {
  gulp.src(path.join(SRC_ROOT, '**/*.styl'))
    .pipe(gulpStylint({config: path.join(PROJECT_ROOT, '.stylintrc')}))
    .pipe(gulpStylint.reporter());
});


/**
 * Task for transpile stylus
 */
gulp.task('dev:styl', ['dev:styl:lint'], () => {
  const extOptions = require('../../default.config');

  return gulp.src(path.join(SRC_ROOT, 'generate.styl'))
    .pipe(gulpPlumber())
    .pipe(gulpSourcemaps.init())
    .pipe(gulpStylus({
      rawDefine: {
        '$ext-framework-prefix': extOptions.frameworkPrefix,
        '$ext-use-media-query': extOptions.useMediaQuery,
        '$ext-media-queries': extOptions.mediaQueries,
      }
    }))
    .pipe(gulpRename('style.css'))
    .pipe(gulpSourcemaps.write())
    .pipe(gulp.dest(DIST_ROOT));
});


/**
 * Task for watch to transpile on update
 */
gulp.task('watch:styl', () => {
  gulp.watch(path.join(SRC_ROOT, '**/*.styl'), ['dev:styl']);
});


/**
 * Task used with cording
 */
gulp.task('dev:start', ['dev:styl', 'watch:styl']);
