const gulp = require("gulp");

// Css Task
function css(cb) {
  gulp.src("./project/css/");

  // Something...
  cb();
}

exports.css = css;
