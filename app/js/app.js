angular.module('templates', []);
angular.module('app.common', ['restangular']);
angular.module('app.dashboard', ['ui.router','pascalprecht.translate','app.common','app.search']);
angular.module('app.login',['ui.router','app.common']);
angular.module('app.quicksearch',['ui.router','app.common']);
angular.module('app.video',['ui.router','app.common']);
angular.module('app.search',['ui.router','app.common','rzModule']);
angular.module('app.calendar',['ui.router','app.common']);
angular.module('app.simple_contact',['app.common']);
angular.module('app.admin',['ui.bootstrap','ui.bootstrap.tpls']);
angular.module('app.admin.common',['ui.bootstrap','ui.bootstrap.tpls']);
angular.module('app', ['app.dashboard', 'app.common','app.login','app.quicksearch','app.search','app.video','ngSanitize', 'ngAnimate', 'ui.router',

	'pascalprecht.translate','templates','rzModule','ngProgress','ui.grid','dcbImgFallback', "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",'app.admin','app.admin.common',"ui.bootstrap",'ui.bootstrap.tpls','app.simple_contact','app.calendar'])
	.value('version', '0.1')
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider','$translateProvider','$translatePartialLoaderProvider',
        function($httpProvider, $stateProvider, $urlRouterProvider,$translateProvider,$translatePartialLoaderProvider) {
        	$httpProvider.interceptors.push('interceptorNgProgress');
            $httpProvider.interceptors.push('seasonInterceptor');
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
			      },
                  resolve:{
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('dashboard');
                          $translatePartialLoader.addPart('header');
                          $translatePartialLoader.addPart('sidebar');
                          $translatePartialLoader.addPart('countries');

                          // add other needed parts
                          return $translate.refresh();
                      }

                  }
			    })
                .state('communication', {
                    url: "/communication",
                    views:{

                        "sidebar@communication" : {
                            templateUrl: "common/views/sidebar.html"
                        },
                        "header@communication" : {
                            templateUrl : "common/views/header.html",
                            controller : HeaderCtrl
                        },
                        "main" : {
                            controller : CommunicationCtrl,
                            templateUrl: "communication/views/communication.html"
                        }
                    },
                    resolve:{
                        specificTranslations: function($translatePartialLoader, $translate, User) {

                            var user = User.getUser();
                            $translate.use(user.profile.language);

                            $translatePartialLoader.addPart('header');
                            $translatePartialLoader.addPart('sidebar');
                            //$translatePartialLoader.addPart('communication');

                            // add other needed parts
                            return $translate.refresh();
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('admin_modules/dashboard/dashboard');

                          // add other needed parts
                          return $translate.refresh();
                      },
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('admin_games/admin_games');
                            $translatePartialLoader.addPart('admin_games/game');

                          // add other needed parts
                          return $translate.refresh();
                      },
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
				    specificTranslations: function($translatePartialLoader, $translate, User) {

                      var user = User.getUser();
                      $translate.use(user.profile.language);

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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('leagues');

                          // add other needed parts
                          return $translate.refresh();
                      },
                      associations : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
				    	$http.get(api + '/api/countries/' + $stateParams.id + '/associations').success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    },
                    country : function($http,$stateParams,$q,api){
                        var defered = $q.defer();
                        $http.get(api + '/api/countries/' + $stateParams.id ).success(function(result){
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('video');

                          // add other needed parts
                          return $translate.refresh();
                      },
				    game : function($http,$stateParams,$q,api){
				    	var defered = $q.defer();
				    	$http.get(api + '/api/new/games/' + $stateParams.gameid).success(function(result){
				    		defered.resolve(result);
				    	})
				    	return defered.promise;
				    },
                        leagues : function(ngProgress,$http,$stateParams,$q,api){
                            ngProgress.start();
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('teams');

                          // add other needed parts
                          return $translate.refresh();
                      },
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('players');

                          // add other needed parts
                          return $translate.refresh();
                      },
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
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('player');

                          // add other needed parts
                          return $translate.refresh();
                      },
				    player : function(ngProgress,$http,$stateParams,$q,api){
				    	
				    	var defered = $q.defer();
                        $http.get(api + '/api/players/' + $stateParams.id ).success(function(result){
                            defered.resolve(result);
				    	});
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
			      },
                  "resolve" : {
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('header');
                          $translatePartialLoader.addPart('sidebar');
                          $translatePartialLoader.addPart('settings');

                          // add other needed parts
                          return $translate.refresh();
                      },
                      languages : function($http, $q, api){
                          var defered = $q.defer();

                          $http.get(api + '/api/getLanguages').success(function(result){

                              /*
                              angular.forEach(result,function(value){
                                  langs.push(value.substr(3));
                              });
                              */
                              defered.resolve(result);
                          });

                          return defered.promise;
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
			      },
                  resolve:{
                      specificTranslations: function($translatePartialLoader, $translate, User) {

                          var user = User.getUser();
                          $translate.use(user.profile.language);

                          $translatePartialLoader.addPart('admin_modules/dashboard/dashboard');
                          $translatePartialLoader.addPart('admin_modules/common/header');

                          // add other needed parts
                          return $translate.refresh();
                      }
                  }
			    }).state('admin.staff', {
			      url: "/staff",
			      views:{
			      	
			      	"content@admin" : {
			      		templateUrl : "admin_modules/staff/views/staff.html"
			      		
			      	}
			      },
                    resolve:{
                        specificTranslations: function($translatePartialLoader, $translate, User) {

                            var user = User.getUser();
                            $translate.use(user.profile.language);

                            $translatePartialLoader.addPart('admin_modules/staff/staff');

                            // add other needed parts
                            return $translate.refresh();
                        }
                    }
			    }).state('admin.user_rights', {
			      url: "/userrights",
			      views:{
			      	
			      	"content@admin" : {
			      		templateUrl : "admin_modules/user_rights/views/user_rights.html"
			      		
			      	}
			      },
                    resolve:{
                        specificTranslations: function($translatePartialLoader, $translate, User) {

                            var user = User.getUser();
                            $translate.use(user.profile.language);

                            $translatePartialLoader.addPart('admin_modules/user_rights/user_rights');

                            // add other needed parts
                            return $translate.refresh();
                        }
                    }
			    }).state('admin.templates', {
                    url: "/templates",
                    views:{

                        "content@admin" : {
                            templateUrl : "admin_modules/templates/views/templates.html"

                        }
                    },
                    resolve:{
                        specificTranslations: function($translatePartialLoader, $translate, User) {

                            var user = User.getUser();
                            $translate.use(user.profile.language);

                            $translatePartialLoader.addPart('admin_modules/templates/templates');

                            // add other needed parts
                            return $translate.refresh();
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
                .state('calendar', {
                    url: "/calendar",
                    views:{
                        "main" : {
                            templateUrl: "calendar/views/calendar.html",
                            controller : CalendarCtrl
                        },
                        "sidebar@calendar" : {
                            templateUrl: "common/views/sidebar.html"
                        },
                        "header@calendar" : {
                            templateUrl : "common/views/header.html",
                            controller : HeaderCtrl
                        }
                    },
                    resolve: {
                        specificTranslations: function($translatePartialLoader, $translate, User) {

                            var user = User.getUser();
                            $translate.use(user.profile.language);

                            $translatePartialLoader.addPart('header');
                            $translatePartialLoader.addPart('sidebar');
                            $translatePartialLoader.addPart('calendar');

                            // add other needed parts
                            return $translate.refresh();
                        },
                        teams : function(ngProgress, $q, Restangular){
                            ngProgress.start();
                            var defered = $q.defer();
                            Restangular.all('api/teamsCalendar').getList().then(function(result){
                                defered.resolve(result);
                            });
                            return defered.promise;
                        }
                    }

                })

		   $translateProvider.useLoader('$translatePartialLoader', {
			  urlTemplate: '/translations/{lang}/{part}.json'

			});

            $translateProvider.preferredLanguage('ru_Russian');

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
angular.module('app').factory('seasonInterceptor', function ($injector) {
    var Season = $injector.get('Season');
    return {
        request: function (config) {
                if(config.url.indexOf('html')==-1 && config.url.indexOf('json')==-1){
                    config.url =  URI(config.url).addSearch({'season':Season.getSeason()}).toString();
                }


            return config;
        }
    };
})
angular.module('app').filter('age',function(){
    return function(input){
        function getAge(birthDate) {
            var now = new Date();

            function isLeap(year) {
                return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
            }

            // days since the birthdate
            var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
            var age = 0;
            // iterate the years
            for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
                var daysInYear = isLeap(y) ? 366 : 365;
                if (days >= daysInYear){
                    days -= daysInYear;
                    age++;
                    // increment the age only if there are available enough days for the year.
                }
            }
            return age;
        }
        return getAge(newDate(input));
    }
})
