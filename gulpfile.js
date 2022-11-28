const gulp = require("gulp");
const concat = require("gulp-concat");
const prefix = require("gulp-autoprefixer");

// Concat, Prefixer Plugin
gulp.task("css", function () {
  return gulp
    .src("./project/*.css")
    .pipe(prefix("last 2 versions"))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./dist"));
});
