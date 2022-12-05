var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  watch = require("gulp-watch"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify");

// Html Task
gulp.task("html", function () {
  return gulp
    .src("./project/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"))
    .pipe(notify("Html task is done"))
    .pipe(livereload());
});

// Css Task
gulp.task("css", function () {
  return gulp
    .src("./project/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix("last 2 version"))
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(notify("Css task is done"))
    .pipe(livereload());
});

// JS Task
gulp.task("js", function () {
  return gulp
    .src("./project/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"))
    .pipe(notify("JS task is done"))
    .pipe(livereload());
});

// Watch Task
gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch("./project/index.pug", gulp.series("html"));
  gulp.watch("./project/css/**/*.scss", gulp.series("css"));
  gulp.watch("./project/js/*.js", gulp.series("js"));
});
