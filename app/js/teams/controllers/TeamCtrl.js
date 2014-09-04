var TeamCtrl = function($scope, $http, Storage, $state, $stateParams, teams,seasons,leaders,league, ngProgress) {
  
  $scope.teams = teams;
  $scope.leaders = leaders;
  $scope.seasons = seasons;
  $scope.league = league;
  $scope.season=$stateParams.season?$stateParams.season:2013;


  $scope.goTeam = function(object){
  	object.season = $scope.season;
  	$state.go('dashboard.players',object);
  }
  $scope.changeSeason = function(){

  	var temp = {
  		id : $stateParams.id,
  		season : $scope.season
  	}
  	window.location.href = $state.href($state.current.name,temp);
  }
};