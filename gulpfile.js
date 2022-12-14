// 1- vinyl-ftp    ==> To upload dist folder to server with host live
// 2- gulp-bable   ==> To convert js code to old code js
// 3- gulp-replace ==> To replace any string to new string
// 4- load-plugins ==> To download all libraries in one place
// 5- gulp-rename  ==> to rename any files
// 6- gulp-plumber ==> if there is error plumber can pass and continue

// npm i gulp@5.6.1 to install any version from any library

// Main plugins varibles
var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  watch = require("gulp-watch"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),
  zip = require("gulp-zip");

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

// Compress Files
gulp.task("compress", function () {
  return gulp
    .src("./dist/**/*.*")
    .pipe(zip("build.zip"))
    .pipe(gulp.dest("./build"))
    .pipe(notify("Files are compressed"));
});

// Watch Task
gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch("./project/index.pug", gulp.series("html"));
  gulp.watch("./project/css/**/*.scss", gulp.series("css"));
  gulp.watch("./project/js/*.js", gulp.series("js"));
  gulp.watch("./dist/**/*.*", gulp.series("compress"));
});
