var conf       = require('./gulp-conf.json');
var gulp       = require('gulp');

// Clean CSS ans JS directories
gulp.task('clean:css', function() {
    var rimraf = require('gulp-rimraf');
    return gulp.src(conf.clean.css, { read: false })
      .pipe(rimraf());
});

gulp.task('clean:js', function() {
    var rimraf = require('gulp-rimraf');
    return gulp.src(conf.clean.js, { read: false })
      .pipe(rimraf());
});

gulp.task('clean', ['clean:css', 'clean:js']);

// Build JS
conf.scripts.all = Array.prototype.concat(conf.scripts.vendor, conf.scripts.src);

gulp.task('js', function() {

    var concat = require('gulp-concat');
    var ngAnnotate = require('gulp-ng-annotate');
    var uglify = require('gulp-uglify');

    return gulp.src(conf.scripts.all)
        .pipe(ngAnnotate())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// SASS
gulp.task('sass', function() {

    var sass = require('gulp-sass');

    gulp.src(conf.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(conf.sass.dest));
});

// Node server
gulp.task('server', function() {

    var express = require('express');
    var app = express();
    app.use(express.static('public'));

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Listening at http://%s:%s', host, port);
    });
});

// Livereload and watch
gulp.task('watch', function()
{
    var livereload = require('livereload');
    var watch = require('gulp-watch');
    var server = livereload.createServer({exts: ['css']});

    server.watch(__dirname + "/public");

    gulp.watch(conf.scripts.src, ['js']);
    gulp.watch(conf.sass.watch, ['sass']);
    //gulp.watch(conf.templates.src, ['templates']);
});

gulp.task('default', ['clean', 'js', 'sass', 'server', 'watch']);



