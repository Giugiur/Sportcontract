angular.module('templates', []);
angular.module('app.common', ['restangular']);
angular.module('app.dashboard', ['ui.router','pascalprecht.translate','app.common','app.search']);
angular.module('app.login',['ui.router','app.common']);
angular.module('app.quicksearch',['ui.router','app.common']);
angular.module('app.search',['ui.router','app.common','rzModule']);

angular.module('app', ['app.dashboard', 'app.common','app.login','app.quicksearch','app.search','ngSanitize', 'ngAnimate', 'ui.router',
	'pascalprecht.translate','templates','rzModule'])
	.value('version', '0.1')
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider','$translateProvider','$translatePartialLoaderProvider',
        function($httpProvider, $stateProvider, $urlRouterProvider,$translateProvider,$translatePartialLoaderProvider) {
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
			      		templateUrl : "common/views/header.html",
			      		controller : HeaderCtrl
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
			      		controller : CountriesCtrl
			      	}
			      },
			      resolve: {
				    specificTranslations: function($translatePartialLoader, $translate) {
				      $translatePartialLoader.addPart('countries');
				      // add other needed parts
				      return $translate.refresh();
				    }
				  }

			    })
			   .state('dashboard.leagues', {
			      url: "/leagues/:_id",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "leagues/views/leagues.html",
			      		controller : LeagueCtrl
			      	}
			      }

			    })
			   .state('dashboard.teams', {
			      url: "/teams/:_id/:productionversionid",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "teams/views/teams.html",
			      		controller : TeamCtrl
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
			      		controller : LoginCtrl,
			      		templateUrl: "login/views/login.html"
			      	}
			      }
			    })


	       
		   $translateProvider.useLoader('$translatePartialLoader', {
			  urlTemplate: 'translation/{part}/translation/{lang}.json'
			});
			$translateProvider.preferredLanguage('ru');
        }]).run(['$rootScope',function($rootScope){
        	$rootScope.search={
        		searchterm : "",
        		advanced: false
        	};
        	
        }]);