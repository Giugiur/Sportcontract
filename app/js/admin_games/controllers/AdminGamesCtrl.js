var AdminGamesCtrl = function($scope,games,$http,api,$rootScope) {
  $scope.selectedGame;
  $scope.gridOptions = {
  	data : games,
  	enableFiltering: true,
  	columnDefs : [
  		{name:'New edited',
        cellTemplate: '<span ng-show="row.entity.newedited">x</span>'},
	    {name:'Home',field:'home.name'},
	    {name:'Away',field:'away.name'},
	    {name:'Date',field:'date'},
	    {name:'Edit',
	    	cellTemplate: '<a ui-sref="dashboard.admin.game({id:row.entity._id})" class="btn btn-primary">Edit</a>',
	    	enableFiltering: false}
	  ]
  };
  $scope.edit = function(entity){
  	$scope.selectedGame = entity;
  }


  var linkGames = function(){
    $http.get(api+'/api/new/games').success(function(outcome){
      var temp=[];
      for(var i in games){
        if(_.findWhere(outcome,{_id:games[i]._id})){
          games[i].newedited = true;
        }
        temp.push(games[i]);
      }
      $scope.gridOptions.data = temp;
    })
  }
  linkGames();
  $rootScope.$on('new_games_updated',linkGames);
  
};