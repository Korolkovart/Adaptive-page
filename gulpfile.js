const {src, dest, series, watch} = require('gulp')
const less = require('gulp-less')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')
const sync = require('browser-sync').create()
const img = require('gulp-image')

function html(){
  return src('src/**.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}


function lessToCss() {
    return src('src/style/**.less')
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(concat('style.css'))
      .pipe(dest('dist'))
}

function image() {
  return src('src/img/*')
    .pipe(img())
    .pipe(dest('dist/img'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/style/**.less', series(lessToCss)).on('change', sync.reload)
}


exports.build = series(clear, lessToCss, html, image)
exports.serve = series(clear, lessToCss, html, image, serve)
exports.clear = clear
