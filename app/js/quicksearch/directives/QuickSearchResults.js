(function(){
    var quicksearch = function(api,$http,$rootScope,Tabs,$q) {

	    return {
	        restrict: 'E',
	        scope: {
	            'search': '='
	        },
	        transclude: true,
	        templateUrl: 'quicksearch/views/quicksearch.html',
	        link: function link(scope, element, attrs){
	        	scope.players = [];
	        	scope.teams = [];
	        	scope.countries = [];
	        	scope.leagues = [];
	        	scope.staffs = [];

	        	scope.newTab = function(a,b,c){
					scope.search.searchterm='';
					Tabs.newTab(a,b,c._source?c._source:c);
				};

		     	var propagateUp = function(){
		     		if((!scope.teams || scope.teams.length==0) ){
			     		if(scope.players[0]){
			     			var team = {_source:{}};
				     		team._source.team = scope.players[0]._source.team;
				     		team._source.league = scope.players[0]._source.league;

				     		scope.teams.push(team);
			     		}
			     		if(scope.staffs[0]){
			     			var team = {_source:{}};
				     		team._source.team = scope.staffs[0]._source.team;
				     		team._source.league = scope.staffs[0]._source.league;

				     		scope.teams.push(team);
			     		}
		     		}
			     	if((!scope.leagues || scope.leagues.length==0) && scope.teams[0]){
			     		var league = {_source:{}};
			     		league._source = scope.teams[0]._source.league;
			     		
			     		scope.leagues.push(league);
			     		
			     	}
			     	if((!scope.countries || scope.countries.length==0) && scope.leagues[0]){
			     		var country = {_source:{}};
			     		country._source = scope.leagues[0]._source.country;
			     		scope.countries.push(country);
					}
				};

				var alwaysSuccess = function(request,callback){
					request.success(function(data){
						callback(data)
					}).error(function(err){
						callback({
							hits:{
				                hits:[]
				            }
				        });
				    });
			 	}

				var searchFunc = _.debounce(function(newval){
					var teams = $http.get(api +'/api/search/teams/' + newval.searchterm);
					var leagues = $http.get(api +'/api/search/leagues/' + newval.searchterm);
					var players = $http.get(api +'/api/search/players/' + newval.searchterm);
					var countries = $http.get(api +'/api/search/countries/' + newval.searchterm);
					var staffs = $http.get(api +'/api/search/staffs/' + newval.searchterm);

					alwaysSuccess(teams, function(data){
						scope.teams = data.hits.hits;
					});

					alwaysSuccess(leagues, function(data){
						scope.leagues = data.hits.hits;
					});

					alwaysSuccess(players, function(data){
						scope.players = data.hits.hits;
					});

					alwaysSuccess(countries, function(data){
						scope.countries = data.hits.hits;
					});

					alwaysSuccess(staffs, function(data){
						scope.staffs = data.hits.hits;
					});

					$q.all([teams, leagues, players, countries, staffs]).then(propagateUp);
				},100);

				scope.$watch('search',function(newval){
					if(newval.searchterm && newval.searchterm.length>0){
		     			searchFunc(newval);
		     		}
		     	},true);
		  	}
	    };
  	}

	var quicksearchModule = angular.module('app.quicksearch');
	quicksearchModule.directive('quicksearch',['api','$http','$rootScope','Tabs', '$q', quicksearch]);
}());