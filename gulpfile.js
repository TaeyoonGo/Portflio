const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync')
const scss = require("gulp-sass")(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const del = require('del')

gulp.task('clean', () => {
  return del ('./dist')
})

gulp.task('script', () => {
    return gulp
        .src('./src/assets/*.js')
        .pipe(babel({
          'presets': [
            '@babel/preset-env'
          ]
      }))
        .pipe(gulp.dest('./dist/assets'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('img', () => {
    return gulp
        .src('./src/assets/img/*.*')
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('scss', () => {
    const options = {
        outputStyle: 'expanded',
        indentType: 'space',
        indentWidth: 4,
        precision: 8,
        sourceComments: false
    }

    return gulp
        .src('./src/assets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(scss(options))
        .pipe(autoprefixer({cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', () => {
    return gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('nodemon', cd => {
    let started = false;
    return nodemon({script: 'app.js'}).on('start', () => {
        if (!started) {
            cd();
            started = true
        }
    })
})

gulp.task('browser-sync', gulp.series('nodemon', () => {
    browserSync.init(null, {
        proxy: 'http://localhost:5020',
        port: 5021
    })
}))

gulp.task('watch', () => {
    gulp.watch('./src/**/*.html', gulp.series(['html']))
    gulp.watch('./src/assets/**/*.scss', gulp.series(['scss']))
    gulp.watch('./src/assets/**/*.js', gulp.series(['script']))
    gulp.watch('./src/assets/**/*.*', gulp.series(['img']))
})

const series = gulp.series([
    'clean',
    'script',
    'img',
    'html',
    'scss',
    gulp.parallel('browser-sync', 'watch')
])

gulp.task('default', series)
