module.exports = function(config){

  config.set({
    basePath : '..', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/lodash/dist/lodash.js',
        'app/bower_components/restangular/dist/restangular.js',
        'app/bower_components/moment/moment.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        //'app/js/**/*.js',
        //'app/js/**/**/*.js',
        'app/js/common/app.js',
        'app/js/common/**/*.js',
        'app/js/login/app.js',
        'app/js/login/controllers/*.js',
        'test/unit/login/**/*.js'
    ],

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine'
    ]

})}
