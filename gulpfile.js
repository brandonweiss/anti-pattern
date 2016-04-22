"use strict";

const gulp         = require("gulp")
const concat       = require("gulp-concat")
const sass         = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const watch        = require("gulp-watch")

gulp.task("assets", function() {
  let javascripts = gulp.src("./source/javascripts/application.js")
    .pipe(concat("application.js"))
    .pipe(gulp.dest("./tmp/dist/javascripts/"))

  let stylesheets = gulp.src("./source/stylesheets/application.scss")
    .pipe(sass.sync({
      includePaths: ["./node_modules"],
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("application.css"))
    .pipe(gulp.dest("./tmp/dist/stylesheets/"))

  return Promise.all([javascripts, stylesheets])
})

gulp.task("watch", function() {
  return watch(["./source/javascripts/*", "./source/stylesheets/*"], function() {
    return gulp.start("assets")
  })
})
