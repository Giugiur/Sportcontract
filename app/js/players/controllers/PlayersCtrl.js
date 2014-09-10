var PlayersCtrl = function($scope, $http, Storage, $state, $stateParams, players,seasons,team, ngProgress) {


  $scope.team = team;
  $scope.players=players;
  $scope.seasons = seasons;
  $scope.season=$stateParams.season?$stateParams.season:2013;
  


  $scope.goPlayer = function(object){
  	object.season = $scope.season;
  	$state.go('dashboard.player',object);
  }
  $scope.changeSeason = function(){

  	var temp = {
  		id : $stateParams.id,
  		season : $scope.season
  	}
  	window.location.href = $state.href($state.current.name,temp);
  }
};