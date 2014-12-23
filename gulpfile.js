var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var es = require('event-stream');
var compass = require('gulp-compass');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var karma = require('gulp-karma');

var _ = require('underscore');


gulp.task('compass', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(compass({
            css: 'build',
            sass: 'app/scss',
            image: 'app/img'
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('build'));
});

gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./app/index.html',
        './app/js/**/*.html'])
        .pipe(templateCache('templates.js',{standalone:true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('index',function(){
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src(bowerFiles({debug:true}), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            gulp.src('./app/js/**/*.css', {read: false}),
            gulp.src(['./app/js/**/*.js','./gpx.js','!./app/js/**/*test.js']).pipe(angularFilesort())
        )))
        .pipe(gulp.dest('./build'));
})
gulp.task('copy',function(){
    gulp.src(['./app/js/**/*.*','./app/bower_components/**/*.*'],{ base: './' })
        .pipe(gulp.dest('./build'));
    gulp.src(['./app/assets/**/*.*','./app/img/**/*.*','./app/translations/**/*.*'],{ base: './app/' })
        .pipe(gulp.dest('./build'));
})

gulp.task('test', function() {
    var testFiles = [
        'test/unit/** /*.js'
    ];

    return gulp.src([])
        .pipe(karma({
          configFile: 'test/karma-unit.conf.js',
          action: 'run'
        }))
        .on('error', function(err) {
          throw err;
        });
});

gulp.task('e2etest',function(){
    gulp.src(["./test/e2e/**/**.js"])
        .pipe(protractor({
            configFile: "./test/protractor.config.js",
            args: ['--baseUrl', 'http://localhost:9000']
        }))
        .on('error', function(e) {  })
})
gulp.task('webdriver_standalone', webdriver_standalone);


gulp.task('watch',function(){
    gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css'
    ], _.debounce(function(event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    },1500));
    gulp.watch(['./app/js/**/*.js','./app/js/**/*.json','./app/bower_components/**/*.js','!./app/js/**/*test.js'],['index','copy']);
    gulp.watch(['!./app/index.html','./app/js/**/*.html'],['templates','index','copy']);
    gulp.watch(['./app/scss/*.scss'],['compass']);
    gulp.watch(['./img/**.*'],['copy']);
    gulp.watch('./modules/index.html',['index']);

});

gulp.task('connect',function(){connect.server({
    root: ['build'],
    port: 9000,
    livereload: true
})});

gulp.task('default',['connect','copy','templates','compass','index','watch']);
gulp.task('build',['copy','templates','compass','index']);
gulp.task('prot',['connect','e2etest']);