angular.module('templates', []);
angular.module('app.common', []);
angular.module('app.dashboard', ['ui.router','pascalprecht.translate']);

angular.module('app', ['app.dashboard', 'app.common', 'ngSanitize', 'ngAnimate', 'ui.router',
	'pascalprecht.translate','templates'])
	.value('version', '0.1')
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider','$translateProvider','$translatePartialLoaderProvider'
        function($httpProvider, $stateProvider, $urlRouterProvider,$translateProvider, $translatePartialLoaderProvider) {
        	$urlRouterProvider.otherwise("/login");
        	$stateProvider
			    .state('dashboard', {
			      url: "/dashboard",
			      views:{
			      	"main" : {
			      		controller : DashboardCtrl,
			      		templateUrl: "dashboard/views/dashboard.html"
			      	},
			      	"sidebar@dashboard" : {
			      		templateUrl: "common/views/sidebar.html"
			      	},
			      	"header@dashboard" : {
			      		templateUrl : "common/views/header.html"
			      	},
			      	"tabcontent@dashboard" : {
			      		templateUrl: "countries/views/countries.html",
			      		controllers : CountriesCtrl
			      	}
			      }
			    })
			   .state('dashboard.countries', {
			      url: "/countries",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "countries/views/countries.html",
			      		controllers : CountriesCtrl
			      	}
			      }
			    })
			   .state('dashboard.sample', {
			      url: "/sample",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "dashboard/views/partials/sample.html"
			      	}
			      }
			    })
			   .state('login', {
			      url: "/login",
			      views:{
			      	"main" : {
			      		controller : LoginCtrl
			      		templateUrl: "login/views/login.html"
			      	}
			      }
			    })



		    $translateProvider.useLoader('$translatePartialLoader', {
			  urlTemplate: '/i18n/{part}/{lang}.json'
			});
			$translateProvider.preferredLanguage('en');
        }]);