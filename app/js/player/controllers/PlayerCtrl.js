var PlayerCtrl = function($scope, $http, Storage, $state, $stateParams, player, ngProgress,api) {
  
  $scope.player=player;
  $scope.stats;
  $scope.calculateBMI = function(height,weight){
      return Number(weight)/Math.pow(Number(height)/100,2);
  }

  $http.get(api + '/api/players/' + $stateParams.id + '/stats').success(function(result){
      $scope.stats = result;
  })
    $scope.gridCarreerTotal = {};
    $scope.gridCarreerHighlight = {};
    $scope.gridTransfers = {};
    $scope.gridAwards = {
        columnDefs : [

            {name : 'Name',field:'awardType.name'}

        ],
        enableFiltering:true,
        data : player.awards
    }
    SetupSinglePlayerGrids(api,player,$stateParams,$scope,$http);
};

var SetupSinglePlayerGrids = function(api,player,$stateParams,$scope,$http){
    $http.get(api+'/api/players/'+$stateParams.id + '/totals').success(function(result){
        $scope.gridCarreerTotal.data = result;
    })
    $http.get(api+'/api/players/'+$stateParams.id + '/highlights').success(function(result){
        $scope.gridCarreerHighlight.data = result;
    })
    $http.get(api+'/api/players/'+$stateParams.id + '/transfers').success(function(result){
        $scope.gridCarreerTransfers.data = result;
    })

}