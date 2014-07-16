var TeamCtrl = function($scope, $http, Storage, $state, $stateParams) {
  $scope.teams;
  var storageTeams = Storage.init('api/prospect/teams/'+ $stateParams.productionversionid +'/' + $stateParams._id,false,{});
  storageTeams.all().then(function(outcome){
	  	$scope.teams = outcome;
	  })
  


  $scope.goLeague = function(object){
  	$state.go('dashboard.players',object);
  }

};