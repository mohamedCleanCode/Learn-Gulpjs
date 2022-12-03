var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  watch = require("gulp-watch");

// Html Task
gulp.task("html", function () {
  return gulp
    .src("./project/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"));
});

// Css Task
gulp.task("css", function () {
  return gulp
    .src("./project/css/main.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix("last 2 version"))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./dist/css"));
});

// JS Task
gulp.task("js", function () {
  return gulp
    .src("./project/js/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/js"));
});

// Watch Task
gulp.task("watch", function () {
  require("./server");
  gulp.watch("./project/index.pug", gulp.series("html"));
  gulp.watch("./project/css/**/*.scss", gulp.series("css"));
  gulp.watch("./project/js/*.js", gulp.series("js"));
});
