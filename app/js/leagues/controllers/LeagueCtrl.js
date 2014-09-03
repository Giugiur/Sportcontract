var LeagueCtrl = function($scope, $http, Storage, $state, $stateParams, Tabs,api,associations,ngProgress) {
  
  $scope.associations = associations;

  console.log($scope.associations)


  $scope.goLeague = function(object){
  	$state.go('dashboard.teams',object);
  }

};