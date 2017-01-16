const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpRename = require('gulp-rename');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpStylus = require('gulp-stylus');
const gulpPug = require('gulp-pug');
const {join} = require('path');
const {DOCS_ROOT} = require('../constants');
const DOCS_STYLUS_ROOT = join(DOCS_ROOT, 'src/stylus');
const DOCS_PUG_ROOT = join(DOCS_ROOT, 'src/pug');


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
 * Task to generate index.html with transpiling pug
 */
gulp.task('docs:pug:transpile', () => {
  return gulp.src(join(DOCS_PUG_ROOT, 'index.pug'))
    .pipe(gulpPug())
    .pipe(gulp.dest(DOCS_ROOT));
});


/**
 * Task to build stylus and pug in development
 */
gulp.task('docs:build:dev', [
  'docs:styl:transpile',
  'docs:pug:transpile'
]);


/**
 * Task to watch files in docs/src to reload browser and transpile stylus
 */
gulp.task('docs:watch', (done) => {
  gulp.watch(join(DOCS_STYLUS_ROOT, '**/*.styl'), ['docs:styl:transpile']);
  gulp.watch(join(DOCS_PUG_ROOT, '**/*.pug'), ['docs:pug:transpile']);
  done();
});


/**
 * Task to edit docs
 */
gulp.task('docs:start-editing', ['docs:build:dev', 'docs:watch']);
