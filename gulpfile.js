const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "src",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles-dev", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("styles-prod", function () {
    return gulp
      .src("src/sass/**/*.+(scss|sass)")
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      // .pipe(rename({ suffix: ".min", prefix: "" }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
  });
  

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles-dev"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles-dev"));