module.exports = function(config){
  config.set({
    basePath : '..', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
        //dependencies
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/lodash/dist/lodash.js',
        'app/bower_components/restangular/dist/restangular.js',
        'app/bower_components/moment/moment.js',
        'app/bower_components/angular-translate/angular-translate.js',
        'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
        'app/bower_components/angular-sanitize/angular-sanitize.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angularjs-slider/rzslider.js',
        'app/bower_components/ngprogress/build/ngProgress.js',
        'app/bower_components/angular-ui-grid/ui-grid.js',
        'app/bower_components/angular-img-fallback/angular.dcb-img-fallback.js',
        'app/bower_components/videogular/videogular.js',
        'app/bower_components/videogular-controls/controls.js',
        'app/bower_components/angular-mocks/angular-mocks.js',

        //required for html2js 
        'app/js/**/**/*.html', 
        
        'app/js/app.js',
        'app/js/form_creator/directives/*.js',    //todo: 
        'app/js/form_creator/directives/**/*.js', // module definition in wrong place in this module
        'app/js/**/*.js',
        'app/js/**/**/*.js',
        'app/js/**/**/**/*.js',

        //unit tests
        'test/unit/**/*.js',
        'test/unit/**/**/*.js'
    ],

    preprocessors: {
      'app/js/**/**/*.html': ['html2js'],
      'app/js/**/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
       moduleName: 'templates'
    },

    reporters: ['progress', 'coverage'],
    
    junitReporter: {
        outputFile: 'reports/junit/TESTS-xunit.xml'
    },
    coverageReporter: {
        type:   'lcov',
        dir:    'reports',
        subdir: 'coverage'
    },

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        'karma-coverage'
    ]
})};