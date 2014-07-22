var TeamCtrl = function($scope, $http, Storage, $state, $stateParams, teams, ngProgress) {
  ngProgress.complete();
  $scope.teams = teams;
  
  


  $scope.goTeam = function(object){
  	$state.go('dashboard.players',object);
  }

};