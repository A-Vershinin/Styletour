"use strict";

var gulp = require("gulp");  // Подключаем Gulp
var sass = require("gulp-sass");  // Подключаем Sass-пакет
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");

gulp.task("style", function() { //Создаём такс "style"
  gulp.src("sass/style.scss")   //Берём источник для обработки
    .pipe(plumber())
    .pipe(sass())   //Преобразуем Sass в CSS
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))  //Выгружаем результаты в папку CSS
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);  //Наблюдение за scss файлами в папке scss
  gulp.watch("*.html").on("change", server.reload); //Наблюдение за html файлами в папке проекта
});
