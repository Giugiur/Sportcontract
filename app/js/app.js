angular.module('templates', []);
angular.module('app.common', ['restangular']);
angular.module('app.dashboard', ['ui.router','pascalprecht.translate','app.common','app.search']);
angular.module('app.login',['ui.router','app.common']);
angular.module('app.quicksearch',['ui.router','app.common']);
angular.module('app.video',['ui.router','app.common']);
angular.module('app.search',['ui.router','app.common','rzModule']);
angular.module('app.simple_contact',['app.common']);
angular.module('app.admin',['ui.bootstrap','ui.bootstrap.tpls'])
angular.module('app.admin.common',['ui.bootstrap','ui.bootstrap.tpls'])
angular.module('app', ['app.dashboard', 'app.common','app.login','app.quicksearch','app.search','app.video','ngSanitize', 'ngAnimate', 'ui.router',
	'pascalprecht.translate','templates','rzModule','ngProgress','dcbImgFallback', "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",'app.admin','app.admin.common',"ui.bootstrap",'ui.bootstrap.tpls','app.simple_contact'])
	.value('version', '0.1')
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider','$translateProvider','$translatePartialLoaderProvider',
        function($httpProvider, $stateProvider, $urlRouterProvider,$translateProvider,$translatePartialLoaderProvider) {
        	$httpProvider.interceptors.push('interceptorNgProgress');
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
				    /*specificTranslations: function($translatePartialLoader, $translate) {
				      $translatePartialLoader.addPart('countries');

				      // add other needed parts
				      return $translate.refresh();
				    },*/
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
				    associations : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	$http.get(api + '/api/countries/' + $stateParams.id + '/associations').success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    }
				  }

			    })
			   .state('dashboard.video', {
			      url: "/video/:gameid",
			      views:{
			      	"tabcontent@dashboard" : {
			      		templateUrl: "video/views/video.html",
			      		controller : VideoCtrl
			      	}
			      },
			      resolve: {
				    game : function($http,$stateParams,$q,api){
				    	var defered = $q.defer();
				    	$http.get(api + '/api/new/games/' + $stateParams.gameid).success(function(result){
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
                    league : function($http,$stateParams,$q,api){
                        var defered = $q.defer();
                        $http.get(api + '/api/leagues/' + $stateParams.id).success(function(result){
                            defered.resolve(result);
                        })
                        return defered.promise;
                    },
				    teams : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	var season = $stateParams.season?$stateParams.season:2013;
				    	$http.get(api + '/api/leagues/' + $stateParams.id + '/teams?fields=team,GP,W,L,OTW,OTL,GF,GA,TP,position&season=' + season).success(function(result){
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
				    },
                    leaders : function($http,$stateParams,$q,api){
                        var defered = $q.defer();
                        $http.get(api + '/api/leagues/' + $stateParams.id + '/leaders').success(function(result){
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
                      team : function(ngProgress,$http,$stateParams,$q,api){

                          var defered = $q.defer();

                          $http.get(api + '/api/teams/' + $stateParams.id ).success(function(result){
                              defered.resolve(result);
                          })
                          return defered.promise;
                      },
				    players : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	var season = $stateParams.season?$stateParams.season:2013;
				    	$http.get(api + '/api/teams/' + $stateParams.id + '/players?fields=player&season=' + season).success(function(result){
                            result = _.map(result,function(res){
                                return res.player;
                            })
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
			    }).state('admin', {
			      url: "/admin",
			      views:{
			      	"header@admin" : {
			      		templateUrl : "admin_modules/common/views/header.html",
			      		controller : AdminHeaderCtrl
			      	},
			      	"main" : {
			      		
			      		templateUrl: "admin_modules/dashboard/views/dashboard.html"
			      	}
			      }
			    }).state('admin.staff', {
			      url: "/staff",
			      views:{
			      	
			      	"content@admin" : {
			      		templateUrl : "admin_modules/staff/views/staff.html"
			      		
			      	}
			      }
			    }).state('admin.user_rights', {
			      url: "/userrights",
			      views:{
			      	
			      	"content@admin" : {
			      		templateUrl : "admin_modules/user_rights/views/user_rights.html"
			      		
			      	}
			      }
			    }).state('admin.templates', {
                    url: "/templates",
                    views:{

                        "content@admin" : {
                            templateUrl : "admin_modules/templates/views/templates.html"

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

/*
            function getFile(url) {
                var AJAX;
                if (window.XMLHttpRequest) {
                    AJAX=new XMLHttpRequest();
                } else {
                    AJAX=new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (AJAX) {
                    AJAX.open("GET", url, false);
                    AJAX.send(null);
                    return AJAX.responseText;
                } else {
                    return false;
                }
            }

            //browser language recognition
            //maybe needs to be removed later on think about the american coach in russia ;)
            //otherwise find a way to simply add a new language by simply putting a new .json
            //file with the wanted tranlation into the tranlation folder so everything is addded automatically

            var userLang = navigator.language || navigator.userLanguage;
            var lang = "en";
            var language = getFile("translations/" + userLang.substring(0,2) +".json");
            try{
                language = JSON.parse(language);
                lang = userLang.substring(0,2);
            }catch(e){
                try{
                    language = JSON.parse(getFile("translations/en.json"));
                }catch(e){
                    language = {};
                }

            }

            //console.log(language);
            $translateProvider.translations(lang,language);
            $translateProvider.useStaticFilesLoader({
                'prefix': 'translations/',
                'suffix': '.json'
            });

            $translateProvider.preferredLanguage(lang);

*/
		   $translateProvider.useLoader('$translatePartialLoader', {
			  urlTemplate: '/translation/{part}/{lang}.json'
			});
			$translateProvider.preferredLanguage('ru');

        }]).run(['$rootScope','ngProgress','$timeout',function($rootScope,ngProgress,$timeout){
        	$rootScope.search={
        		searchterm : "",
        		advanced: false
        	};
        	
        }]);

angular.module('app').factory('interceptorNgProgress', function ($injector) {
  var complete_progress, getNgProgress, ng_progress, working;
  ng_progress = null;
  working = false;

  getNgProgress = function() {
    ng_progress = ng_progress || $injector.get("ngProgress");
    
    return ng_progress;
  };

  complete_progress = function() {
    var ngProgress;
    if (working) {
      ngProgress = getNgProgress();
      ngProgress.complete();
      return working = false;
    }
  };

  return {
    request: function(request) {
      var ngProgress;
      ngProgress = getNgProgress();
      if (request.url.indexOf('.html') > 0) {
        return request;
      }
      if (!working) {
        ngProgress.reset();
        ngProgress.start();
        working = true;
      }
      return request;
    },
    requestError: function(request) {
      complete_progress();
      return request;
    },
    response: function(response) {
      complete_progress();
      return response;
    },
    responseError: function(response) {
      complete_progress();
      return response;
    }
  }
});