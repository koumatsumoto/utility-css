const gulp = require('gulp');


gulp.task('default', ['help']);
gulp.task('help', () => {
  const taskList = Object.keys(gulp['tasks']).sort();
  console.log(`\nHere's a list of supported tasks:\n   `, taskList.join('\n    '));
});