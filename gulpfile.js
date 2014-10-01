var gulp = require('gulp')
    , usemin = require('gulp-usemin')
    , uglify = require('gulp-uglify')
    , rimraf = require('rimraf')
    , minifyHtml = require('gulp-minify-html')
    , minifyCss = require('gulp-minify-css')
    , compass = require('gulp-compass')
    , header = require('gulp-header')
    , inject = require('gulp-inject')
    , imagemin = require('gulp-imagemin')
    , templateCache = require('gulp-angular-templatecache')
    , ngmin = require('gulp-ngmin')
    , refresh = require('gulp-livereload')
    , jshint = require('gulp-jshint')
    , rev = require('gulp-rev')
    , lrserver = require('tiny-lr')()
    , express = require('express')
    , livereload = require('connect-livereload')
    , concat = require('gulp-concat')
    , bower = require('gulp-bower')
    , karma = require('gulp-karma')
    , wiredep = require('wiredep');;

// Constants
var SERVER_PORT = 19056;
var LIVERELOAD_PORT = 35729;

// Header configuration
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// Compilation tasks
gulp.task('clean', function (cb) {
    rimraf.sync('./build');
    cb(null);
});

gulp.task('compass', function () {
    return gulp.src('./app/scss/main.scss')
        .pipe(compass({
            css: '.tmp/css',
            sass: 'app/scss',
            image: 'app/img'
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('./.tmp'))
        .pipe(refresh(lrserver));
});
gulp.task('translation',function(){
    return gulp.src('./app/js/**/**/*.json')
        .pipe(gulp.dest('./.tmp/translation'));
})
gulp.task('scripts', function() {
  gulp.src('./app/js/**/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./.tmp/js'))
  
});
// gulp.task('test', function() {
//   var bowerDeps = wiredep({
//     directory: 'app/bower_components',
//     dependencies: true,
//     devDependencies: true
//   });

//   var testFiles = bowerDeps.js.concat([
//     'app/js/**/*.js',
//     'test/unit/**/*.js'
//   ]);

//   return gulp.src(testFiles)
//     .pipe(karma({
//       configFile: 'test/karma-unit.conf.js',
//       action: 'run'
//     }))
//     .on('error', function(err) {
//       console.log(err);
//     });
  
// });
gulp.task('bower', function() {
  bower().pipe(gulp.dest('./.tmp/bower_components'))
});
gulp.task('lint', function() {
    return gulp.src('./app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('views', function() {
    gulp.src(['./app/js/**/*.html','./app/js/**/**/*.html'])
        .pipe(templateCache())
        .pipe(gulp.dest('./app/js'));
    gulp.src('./app/index.html')
     .pipe(gulp.dest('./.tmp'))
});

gulp.task('images', function() {
    return gulp.src('./app/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./.tmp/img'));
});

gulp.task('compile', ['clean', 'views', 'images', 'compass', 'lint','scripts'], function() {
    var projectHeader = header(banner, { pkg : pkg } );
    gulp.src('./app/*.html')
        .pipe(inject(gulp.src('./.tmp/assets/javascripts/templates.js', {read: false}),
            {
                starttag: '<!-- inject:templates:js -->',
                ignorePath: '/.tmp'
            }
        ))
        .pipe(usemin({
            css:          [minifyCss(), rev(), projectHeader],
            html:         [minifyHtml({ empty: true })],
            js:           [ngmin(), uglify(), rev(), projectHeader],
            js_libs:      [rev()]
        }))
        .pipe(gulp.dest('build/'));
});

// Serve tasks
gulp.task('reload:html', function () {
    return gulp.src('./app/**/*.html')
        .pipe(lrserver.changed);
});

gulp.task('watch', function () {
    refresh.listen(LIVERELOAD_PORT);
    gulp.watch('app/scss/**/*.scss', ['compass']);
    gulp.watch('app/index.html', ['views']);
    gulp.watch('app/**/*.html', ['views','script']);
    gulp.watch('app/js/**/*.html', ['views','script']);
    // gulp.watch('app/js/**/*.js', ['scripts','test']);
    // gulp.watch('app/js/*.js', ['scripts','test']);
    gulp.watch('app/js/*/translation/*.json', ['translation']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('app/img/**/*.*', ['images']);
    // gulp.watch('test/unit/**/*.js', ['test']);
    gulp.watch([
        '.tmp/**/*',
        '.tmp/*'
      ]).on('change', refresh.changed );
});


gulp.task('serve:app', ['compass','bower','images','views','scripts','translation','watch'], function() {
    var server = express();
    server.use(livereload({
      port: LIVERELOAD_PORT
    }));
    server.use(express.static('./.tmp'));
    server.use(express.static('./app'));
    server.listen(SERVER_PORT);

    
});

gulp.task('serve:build', function() {
    var server = express();
    server.use(express.static('./build'));
    server.listen(SERVER_PORT);
});

gulp.task('default', ['compile']);