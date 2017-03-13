"use strict";

var gulp = require("gulp"), //подключаем Gulp
    sass = require("gulp-sass"), //подключаем Sass-пакет
    plumber = require("gulp-plumber"), //подключаем Пламбер
    postcss = require("gulp-postcss"), //подключаем postcss
    autoprefixer = require("autoprefixer"), //подключаем автопрефиксы
    gutil = require("gulp-util"), //различные утилиты для разработки
    csso = require("gulp-csso"), //сжимаем css-файлы
    rename = require("gulp-rename"), //переименовываем файлы
    imagemin = require("gulp-imagemin"), //сжимаем картинки
    svgstore = require("gulp-svgstore"), //создаём svg-спрайт
    svgmin = require("gulp-svgmin"), //сжимаем svg
    concat = require("gulp-concat"), //склеивания файлы
    uglify = require("gulp-uglifyjs"), //сжимаем все js файлы
    mqpacker = require("css-mqpacker"),//склеиваем все медиазапросы
    run = require("run-sequence"), //последовательная работа тасков
    del = require("del"), //удаляем файлы
    sourcemaps = require('gulp-sourcemaps'), //добавление путей в сасс файлы
    notify = require('gulp-notify'), //представление ошибок в удобном виде
    compass = require('gulp-compass'),
    useref = require('gulp-useref'), //объединение файлов в один
    // по указанным в разметке html комментариев.
    gulpif = require('gulp-if'),
    wiredep = require('gulp-wiredep'), //добавление ссылок на плагины bower.
    replace = require('gulp-replace'), //фиксинг некоторых багов
    // cache = require('gulp-cache'), //кешируем
    spritesmith = require('gulp.spritesmith'),
    cheerio = require('gulp-cheerio'),
    server = require("browser-sync"); //браузер-синк(слежение в браузере)

gulp.task("style", function() { //Создаём таск "style"
  gulp.src("app/sass/style.scss")   //Берём файл sass для обработки
    .pipe(plumber({ //Запрещаем ошибкам прерывать скрипт
      errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
    .pipe(sass({errLogToConsole: true}))   //Преобразуем Sass в CSS
    .pipe(postcss([  //Добавляем префиксы под разные версии
      autoprefixer({browsers: ["> 2%"]}),
      mqpacker({
        sort: true //соеденяем все медиазапросы
      })
    ]))
    .pipe(gulp.dest("build/css"))  //Выгружаем результаты в папку build/css
    .pipe(sourcemaps.write())
    .pipe(csso())  //Делаем минификацию кода.
    .pipe(rename("style.min.css")) //переименовываем файл style в style.min
    .pipe(gulp.dest("build/css")) //выгружаем в build/css
    .pipe(server.reload({stream: true})); //После сборки делаем перезагрузку страницы
});

gulp.task("htmlChange", function () {
  return gulp.src([
    "app/*.html"
  ], {
    base: "app"
  })
    .pipe(useref())
    .pipe(gulp.dest("build"))
    .pipe(server.reload({stream: true}));
});
gulp.task("JsChange", function () {
  return gulp.src([
    "app/js/**/*.js"
  ], {
    base: "app"
  })
    .pipe(gulp.dest("build"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("app/sass/**/*.{scss,sass}", ["style"]);  //Наблюдение за scss файлами в папке scss
  gulp.watch("app/js/*.js", ["JsChange"]);  //Наблюдение за js файлами в папке проекта
  gulp.watch("app/*.html", ["htmlChange"]); //Наблюдение за html файлами в папке проекта
  gulp.watch("build/**/*").on("change", server.reload);
});
// ====================================================
// ====================================================
// ================= Сборка проекта BUILD =============
// Чистка папки
gulp.task("clean", function() {
  return del("build");
});
// Копируем файлы из App в папку build
gulp.task("copy", function() {
  return gulp.src([
    "app/fonts/**/*.{woff,woff2}",
    "app/img/**/*",
    "app/js/**",
    "app/*.html"
  ], {
    base: "app"
  })
    .pipe(gulp.dest("build"));
});

gulp.task('useref', function() {
	return gulp.src('app/index.html')
		.pipe(useref()) //Выполняет объединение файлов в один по указанным в разметке html комментариев.
		.pipe(gulp.dest('build/'))
    .pipe(server.reload({stream: true}));
});

// Оптимизация картинок
gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    // используем кеширование для избежания пересжатия уже сжатых изображений каждый раз при запусске задач.
    // нужнен плагин gulp-cahce
    // .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest("build/img"));
});
//svg спрайт
gulp.task("svg-sprite", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgstore({
      mode: {
        symbol: {
          sprite: "../svg-sprite.svg"
        }
      }
    }))
    .pipe(rename("svg-sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//png-sprite
gulp.task('png-sprite', function() {
  var spriteData = gulp.src("app/img/icons/*.png")
		.pipe(spritesmith({
    imgName: 'png-sprite.png',
    cssName: 'png-sprite.scss',
		cssFormat: "css",
		imgPath: "../img/png-sprite.png",
		padding: 70
  }));
  spriteData.img.pipe(gulp.dest("build/img"));
});

// Копируем favicons
gulp.task("favicons", function() {
  return gulp.src([
    "app/favicons/*.*"
  ])
  .pipe(gulp.dest("build/favicons"));
});
// Остальные файлы и пр.
gulp.task("extras", function() {
  return gulp.src([
    "app/*.*",
    "!app/*.html"
  ])
  .pipe(gulp.dest("build"));
});
//js-common
gulp.task("js-common", function() {
  return gulp.src("app/js/common.js") //берём файл common.js в app/js
  .pipe(gulp.dest("build/js"))
  .pipe(uglify())  //cжимаем common.js
  .pipe(rename("common.min.js")) //переименовываем файл common.js в common.min.js
  .pipe(gulp.dest("build/js"))  //Выгружаем результаты в папку build/css
});
//js-библиотеки
gulp.task("js-libs", function() {
  // return gulp.src("app/bower_modules/**/*.js") //берём все файлы .js в bower_modules
  return gulp.src("build/js/libs.min.js")
  .pipe(uglify())  //cжимаем libs.min.js
  .pipe(rename("libs.min.js"))
  .pipe(gulp.dest("build/js")); //выгружаем в build/js
});
//js-polyfills
gulp.task("js-polyfills", function() {
  return gulp.src("build/js/polyfills.min.js")
  .pipe(uglify())
  .pipe(rename("polyfills.min.js"))
  .pipe(gulp.dest("build/js"));
});
//css-библиотеки
gulp.task("css-libs", function() {
  return gulp.src("build/css/libs.css")
  .pipe(csso())
  .pipe(rename("libs.min.css"))
  .pipe(gulp.dest("build/css"))
});
//Иконочные шрифты
gulp.task("icon-fonts", function() {
  return gulp.src("app/bower/**/fonts/*.{woff,woff2}")
  .pipe(gulp.dest("app/fonts/"))
});

// Собираем папку BUILD
gulp.task("build", function(fn) {
  run(
    "clean",
    // "icon-fonts",
    "copy",
    "style",
    "images",
    "svg-sprite",
    "png-sprite",
    "js-common",
    "useref",
    "js-libs",
    "js-polyfills",
    "css-libs",
    "favicons",
    "extras",
    fn
  );
});
// ====================================================
// ====================================================
// ===================== Функции ======================

// Более наглядный вывод ошибок
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}
gulp.task("watch", function(){
  gulp.watch ([
    "app/*.*"
  ]).on("change", server.reload);
});

gulp.task("default", ["serve", "watch"]);
