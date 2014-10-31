var filtyGridClick = function(e){
	var scope = angular.element($("#grid"+outer)).scope();
	scope.apply(function(){
		scope.changeGame(entity,outer);
	})
}

var GameCtrl = function($scope,game,$q,$http,api,$rootScope) {
  $scope.game = game;
  
  $scope.awayTeams;
  $scope.homeTeams;
  
  $scope.gridOptionsAway = {
    data:[]
  }
  $scope.gridOptionsHome = {
    data:[]
  }
  $scope.gridOptionsLeague = {
    data:[]
  }


  var getTeams = function(str){
  	var deferred = $q.defer();
  	$http.get(api +'/api/search/teams/' + str).success(function(data){
  	    deferred.resolve(data.hits.hits);
  	})
	return deferred.promise;
  }
  var getLeagues = function(str){
    var deferred = $q.defer();
    $http.get(api +'/api/search/leagues/' + str).success(function(data){
        deferred.resolve(data.hits.hits);
    })
  return deferred.promise;
  }
  $scope.newGames;
  
  $scope.changeGame = function(entity,outer){
    entity._source._id = $scope.game[outer]._id;
    $scope.game[outer] = entity._source;
  }
  $scope.saveGame = function(){
    $http.post(api+'/api/new/games/bulk',{
        home_old : $scope.game.home._id,
        home : $scope.game.home,
        away_old : $scope.game.away._id,
        away : $scope.game.away,
        league_old: $scope.game.league._id,
        league : $scope.game.league
    }).success(function(outcome){
      $rootScope.$emit('new_games_updated');
    })
    
  }
  getTeams($scope.game.away.name).then(function(result){
  	$scope.gridOptionsAway.data = result;
  })
  getTeams($scope.game.home.name).then(function(result){
  	$scope.gridOptionsHome.data = result;
  })
  getLeagues($scope.game.league.name).then(function(result){
    $scope.gridOptionsLeague.data = result;
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
  $scope.$watch("game.league.name",function(){
    getLeagues($scope.game.league.name).then(function(result){
      $scope.gridOptionsLeague.data = result;
    })
  },true)

};