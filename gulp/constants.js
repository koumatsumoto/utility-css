const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_ROOT = path.join(PROJECT_ROOT, 'src');
const DIST_ROOT = path.join(PROJECT_ROOT, 'dist');

module.exports = {
  PROJECT_ROOT,
  SRC_ROOT,
  DIST_ROOT
};