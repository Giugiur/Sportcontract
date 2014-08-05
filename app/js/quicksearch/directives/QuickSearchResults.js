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
	     	Tabs.newTab(a,b,c._source?c._source:c);
	     }
	     var propagateUp = function(){
	     	if((!scope.teams || scope.teams.length==0) && scope.players[0] ){
	     		var team = {_source:{}};
	     		team._source.team = scope.players[0]._source.team;
	     		team._source.league = scope.players[0]._source.league;
	     		
	     		scope.teams.push(team);
	     		
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
	     var searchFunc = _.throttle(function(newval){
	     			
	     			$http.get(api +'/api/search/teams/' + newval.searchterm).success(function(data){
	     				scope.teams = data.hits.hits;
	     				$http.get(api +'/api/search/leagues/' + newval.searchterm).success(function(data){
		     				scope.leagues = data.hits.hits;
		     				$http.get(api +'/api/search/players/' + newval.searchterm).success(function(data){
			                    scope.players = data.hits.hits;
			                    $http.get(api +'/api/search/countries/' + newval.searchterm).success(function(data){
	                    			scope.countries = data.hits.hits;
	                    			 $http.get(api +'/api/search/staffs/' + newval.searchterm).success(function(data){
						                scope.staffs = data.hits.hits;
						                propagateUp();    
						             })
				                })
			                })
		                })
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