var filtyGridClick = function(e){
	var scope = angular.element($("#grid"+outer)).scope();
	scope.apply(function(){
		scope.changeGame(entity,outer);
	})
}

var GameCtrl = function($scope,game,$q,$http,api,$rootScope) {
  $scope.game = game;
  
  $scope.awayTeams;
  $scope.gridOptionsHome = {
  	data : $scope.awayTeams,
  	columnDefs : [
  		{name:'Similar Teams',field:'_source.name'},
  		{name:'Select',
  			cellTemplate: '<a onclick="filtyGridClick({{row.entity}},\'home\')"  class="btn btn-primary">Select</a>'}
	  ]
  };
  $scope.homeTeams;
  $scope.gridOptionsAway = {
  	data : $scope.awayTeams,
  	columnDefs : [
  		{name:'Similar Teams',field:'_source.name'},
  		{name:'Select',
  			cellTemplate: '<a ng-click="" class="btn btn-primary">{{getExternalScopes()}} Select</a>'}
	  ]
  };


  var getTeams = function(str){
  	var deferred = $q.defer();
  	$http.get(api +'/api/search/teams/' + str).success(function(data){
  	    deferred.resolve(data.hits.hits);
  	})
	return deferred.promise;
  }
  $scope.newGames;
  
  $scope.changeGame = function(entity,outer){
    $scope.game[outer] = entity._source;
  }
  $scope.saveGame = function(){
    $http.post(api+'/api/new/games',$scope.game).success(function(outcome){
      $rootScope.$emit('new_games_updated');
    })
  }
  getTeams($scope.game.away.name).then(function(result){
  	$scope.gridOptionsAway.data = result;
  })
  getTeams($scope.game.home.name).then(function(result){
  	$scope.gridOptionsHome.data = result;
  })
  $scope.$watch("game.away.name",function(){
  	getTeams($scope.game.away.name).then(function(result){
	  	$scope.gridOptionsAway.data = result;
	  })
  },true)
  $scope.$watch("game.home.name",function(){
  	getTeams($scope.game.home.name).then(function(result){
	  	$scope.gridOptionsHome.data = result;
	  })
  },true)

};