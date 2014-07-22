angular.module('app.quicksearch').directive('quicksearch',['api','$http','$rootScope','Tabs', function(api,$http,$rootScope,Tabs) {
    return {
      restrict: 'E',
      scope: {
        'search': '='
      },
      transclude : true,
      templateUrl: 'quicksearch/views/quicksearch.html',
      link : function link(scope, element, attrs) {
	     scope.players;
	     scope.teams;
	     scope.countries;
	     scope.leagues;
	     scope.staffs;

	     scope.newTab = function(a,b,c){
	     	console.log(a,b,c);
	     	Tabs.newTab(a,b,c._source);
	     }

	     var searchFunc = _.throttle(function(newval){
	     			$http.get(api +'/api/search/teams/' + newval.searchterm).success(function(data){
	                    scope.teams = data.hits.hits;
	                })
	                $http.get(api +'/api/search/leagues/' + newval.searchterm).success(function(data){
	                    scope.leagues = data.hits.hits;
	                })
	                $http.get(api +'/api/search/players/' + newval.searchterm).success(function(data){
	                    scope.players = data.hits.hits;
	                })
	                $http.get(api +'/api/search/countries/' + newval.searchterm).success(function(data){
	                    scope.countries = data.hits.hits;
	                })
	                $http.get(api +'/api/search/staffs/' + newval.searchterm).success(function(data){
	                    scope.staffs = data.hits.hits;
	                })
	            },100);
	     
	     scope.$watch('search',function(newval){
	     		if(newval.searchterm && newval.searchterm.length>0){
	     			searchFunc(newval);
	     		}
	     	 	
	     },true)
	  }

    };
  }])