'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var filter = require("gulp-filter");

var paths = {
  dist: './source',
  watch: [
    'layout/*.ejs',
    'layout/**/*.ejs'
    ],
  scripts: [
    'assets/javascripts/vender/**/*.js',
    'assets/javascripts/app/**/*.js'
    ],
  styles: [
    'assets/stylesheets/**/*.sass'
    ]
};

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./source/javascripts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('styles', function() {
  var processors = [
    require('autoprefixer')({ browsers: ['last 3 version', 'ie 8'], cascade: false })
  ];

  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(minifycss())
    .pipe(filter("**/*.css"))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./source/stylesheets'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('hexo', function() {
  browserSync.init({
    proxy: 'localhost:4000'
  });

  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.styles], ['styles']);
});


