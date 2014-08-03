var AdminGamesCtrl = function($scope,games,$http,api,$rootScope) {
  $scope.selectedGame;
  $scope.gridOptions = {
  	data : games,
  	enableFiltering: true,
  	columnDefs : [
  		,
	    {name:'Home',field:'home.name',
        cellTemplate: '<span><i class="fa fa-check-square" style="color:green;" ng-show="row.entity.home.ok"></i>{{row.entity.home.name}}</span>'},
	    {name:'Away',field:'away.name',
        cellTemplate: '<span><i class="fa fa-check-square" style="color:green;" ng-show="row.entity.away.ok"></i>{{row.entity.away.name}}</span>'},
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
        var o = _.findWhere(outcome,{_id:games[i]._id});
        if(o && o.away && o.away.id){
         
          games[i].away.ok = true;
        }
        if(o && o.home && o.home.id){
          games[i].home.ok = true;
        }
        if(o && o.league && o.league.id){
          games[i].league.ok = true;
        }
        temp.push(games[i]);
      }
      $scope.gridOptions.data = temp;
    })
  }
  linkGames();

  
  $rootScope.$on('new_games_updated',linkGames);
  
};