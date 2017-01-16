const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpRename = require('gulp-rename');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpStylus = require('gulp-stylus');
const {join} = require('path');
const {DOCS_ROOT} = require('../constants');
const DOCS_STYLUS_ROOT = join(DOCS_ROOT, 'src/stylus');


/**
 * Task for lint all stylus files before transpile
 */
gulp.task('docs:styl:transpile', () => {
  return gulp.src(join(DOCS_STYLUS_ROOT, 'index.styl'))
    .pipe(gulpPlumber())
    .pipe(gulpSourcemaps.init())
    .pipe(gulpStylus())
    .pipe(gulpRename('style.css'))
    .pipe(gulpSourcemaps.write())
    .pipe(gulp.dest(DOCS_ROOT));
});


/**
 * Task to watch files in docs/src to reload browser and transpile stylus
 */
gulp.task('docs:watch', () => {
  gulp.watch(join(DOCS_STYLUS_ROOT, '**/*.styl'), ['docs:styl:transpile']);
});


/**
 * Task to edit docs
 */
gulp.task('docs:start-editing', ['docs:styl:transpile', 'docs:watch']);
