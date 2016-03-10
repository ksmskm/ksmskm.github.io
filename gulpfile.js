var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-live-server': 'serve'
  }
});

gulp.task('build-css', function() {
  return gulp
    .src('sass/style.scss')
    .pipe(plugins.plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .on('error', function (err) {
        gutil.log(err);
        this.emit('end');
    })
    .pipe(plugins.autoprefixer({
        browsers: legacy_browsers,
        cascade: false
    }))    
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('css'))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['build-css']);
});

gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(watched_files, function (file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('default', ['serve', 'watch']);

var watched_files = [
  './css/*',
  './images/*',
  './js/*',
  './*'
];

var legacy_browsers = [
  '> 1%',
  'last 2 versions',
  'firefox >= 4',
  'safari 7',
  'safari 8',
  'IE 8',
  'IE 9',
  'IE 10',
  'IE 11'
];
