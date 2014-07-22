var PlayersCtrl = function($scope, $http, Storage, $state, $stateParams, players, ngProgress) {
  ngProgress.complete();
  $scope.players=players;
  
  


  $scope.goPlayer = function(object){
  	$state.go('dashboard.player',object);
  }

};