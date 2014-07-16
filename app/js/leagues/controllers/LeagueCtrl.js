var LeagueCtrl = function($scope, $http, Storage, $state, $stateParams, Tabs) {
  $scope.leagues;
  var storageLeagues = Storage.init('api/leagues',true,{});
  storageLeagues.find(function(item){
	  	return item.games.length>0 && item.country && item.country._id == $stateParams._id;
	  }).then(function(outcome){
	  	$scope.leagues = outcome;
	  })
  


  $scope.goLeague = function(object){
  	Tabs.newTab('Teams of ' +object.name,'dashboard.teams',object)
  }

};