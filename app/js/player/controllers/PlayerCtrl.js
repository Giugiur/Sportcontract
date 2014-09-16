var PlayerCtrl = function($scope, $http, Storage, $state, $stateParams, player, ngProgress,api) {
  
  $scope.player=player;
  $scope.stats;
  $scope.calculateBMI = function(height,weight){
      return Number(weight)/Math.pow(Number(height)/100,2);
  }

  $http.get(api + '/api/players/' + $stateParams.id + '/stats').success(function(result){
      $scope.stats = result;
  })
  

};