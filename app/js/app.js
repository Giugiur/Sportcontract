angular.module('templates', []);
angular.module('app.common', []);
angular.module('app.dashboard', ['ui.router']);

angular.module('app', ['app.dashboard', 'app.common', 'ngSanitize', 'ngAnimate', 'ui.router','templates'])
	.value('version', '0.1')
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
        function($httpProvider, $stateProvider, $urlRouterProvider) {
        	$urlRouterProvider.otherwise("/dashboard");

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
        }]);