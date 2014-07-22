var LeagueCtrl = function($scope, $http, Storage, $state, $stateParams, Tabs,api,leagues,ngProgress) {
  ngProgress.complete();
  $scope.leagues = leagues;

  


  $scope.goLeague = function(object){
  	$state.go('dashboard.teams',object);
  }

};