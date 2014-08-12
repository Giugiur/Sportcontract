angular.module('templates', []);
angular.module('app.common', ['restangular']);
angular.module('app.dashboard', ['ui.router','pascalprecht.translate','app.common','app.search']);
angular.module('app.login',['ui.router','app.common']);
angular.module('app.quicksearch',['ui.router','app.common']);
angular.module('app.search',['ui.router','app.common','rzModule']);

angular.module('app', ['app.dashboard', 'app.common','app.login','app.quicksearch','app.search','ngSanitize', 'ngAnimate', 'ui.router',
	'pascalprecht.translate','templates','rzModule','ngProgress','ui.grid','dcbImgFallback'])
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
			    .state('dashboard.admin', {
			      url: "/admin",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "admin_games/views/admin_games.html",
			      		controller : AdminGamesCtrl
			      	}
			      },
			      resolve: {
			      	games : function($q,$http,api){
			      		var defered = $q.defer();
			      		console.log("hi");
				    	$http.get(api + '/api/games' ).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
			      	}
			      }
			    })
			    .state('dashboard.admin.game', {
			      url: "/game/:id",
			      views:{
			      	"game":{
			      		templateUrl : "admin_games/views/game.html",
			      		controller : GameCtrl
			      	}
			      },
			      resolve:{
			      	game : function($q,$http,api,$stateParams){
			      		var defered = $q.defer();
			      		
				    	$http.get(api + '/api/games/' + $stateParams.id ).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
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
				    },
				    countries : function(ngProgress,Storage){
				    	
				    	var storageCountries = Storage.init('api/countries',false,{});
				    	return storageCountries.all();
				    }
				  }

			    })
			   .state('dashboard.leagues', {
			      url: "/leagues/:id",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "leagues/views/leagues.html",
			      		controller : LeagueCtrl
			      	}
			      },
			      resolve: {
				    leagues : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	$http.get(api + '/api/countries/' + $stateParams.id + '/leagues').success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    }
				  }

			    })
			   .state('dashboard.teams', {
			      url: "/teams/:id/:season",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "teams/views/teams.html",
			      		controller : TeamCtrl
			      	}
			      },
			      resolve: {
				    teams : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	var season = $stateParams.season?$stateParams.season:2013;
				    	$http.get(api + '/api/leagues/' + $stateParams.id + '/teams?fields=team&season=' + season).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    },
				    seasons : function($http,$stateParams,$q,api){
				    	var defered = $q.defer();
				    	$http.get(api + '/api/leagues/' + $stateParams.id + '/seasons').success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    }
				  }

			    })
			   .state('dashboard.players', {
			      url: "/players/:id/:season",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "players/views/players.html",
			      		controller : PlayersCtrl
			      	}
			      },
			      resolve: {
				    players : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	var season = $stateParams.season?$stateParams.season:2013;
				    	$http.get(api + '/api/teams/' + $stateParams.id + '/players?fields=player&season=' + season).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    },
				    seasons : function($http,$stateParams,$q,api){
				    	var defered = $q.defer();
				    	$http.get(api + '/api/teams/' + $stateParams.id + '/seasons').success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    }
				  }

			    })
			   .state('dashboard.player', {
			      url: "/player/:id",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "player/views/player.html",
			      		controller : PlayerCtrl
			      	}
			      },
			      resolve: {
				    player : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	$http.get(api + '/api/players/' + $stateParams.id ).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    }
				  }

			    }).state('settings', {
			      url: "/settings",
			      views:{
			      	"main" : {
			      		
			      		templateUrl: "common/views/clear_template.html"
			      	},
			      	"sidebar@settings" : {
			      		templateUrl: "common/views/sidebar.html"
			      	},
			      	"header@settings" : {
			      		templateUrl : "common/views/header.html",
			      		controller : HeaderCtrl
			      	},
			      	"tabcontent@settings" : {
			      		templateUrl: "settings/views/settings.html",
			      		controller : SettingsCtrl
			      	}
			      }
			    }).state('login', {
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
        }]).run(['$rootScope','ngProgress','$timeout',function($rootScope,ngProgress,$timeout){
        	$rootScope.search={
        		searchterm : "",
        		advanced: false
        	};
        	$rootScope.loader;
        	
        	$rootScope.$on('$stateChangeStart', function(next, current) { 
        	  ngProgress.start();
			  $rootScope.loader = $timeout(function(){
			  	ngProgress.complete();
			  },1000);
			 });
        	$rootScope.$on('$stateChangeSuccess', function(next, current) { 
        		ngProgress.complete();
        		if($rootScope.loader){
        			$timeout.cancel($rootScope.loader);

        		}
			  
			});
        }]);