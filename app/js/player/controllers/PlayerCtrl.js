var PlayerCtrl = function($scope, $http, Storage, $state, $stateParams, player, ngProgress,api,$anchorScroll,$location,$rootScope,$timeout) {


    $scope.scrollTo = function(i){
        $location.hash(i);

        // call $anchorScroll()
        $anchorScroll();
    }
  $scope.player=player;
  $scope.stats;
  $scope.calculateBMI = function(height,weight){
      return Number(weight)/Math.pow(Number(height)/100,2);
  }

  $http.get(api + '/api/players/' + $stateParams.id + '/stats').success(function(result){
      $scope.stats = result;
  })
    $scope.gridCarreerTotal = {
        enableFiltering:true,
        columnDefs : [
            {name : 'League',field:'leaguename'},
            {name : 'GP' , field:'GP'},
            {name : 'G' , field:'G'},
            {name : 'A' , field : 'A'},
            {name : 'TP' , field : 'TP'},
            {name : 'PIM' , field : 'PIM'}

        ]
    };
    $scope.gridCarreerHighlight = {columnDefs : [
        {name : 'Season',field:'season.name'},
        {name : 'Award' , field:'award.name'}

    ]};
    $scope.gridTransfers = {columnDefs : [
        {name : 'Date',field:'transferDate'},
        {name : 'From' , field:'fromTeam.name'},
        {name : 'To' , field : 'toTeam.name'}

]};
    $scope.gridAwards = {
        columnDefs : [

            {name : 'Name',field:'awardType.name'}

        ],
        enableFiltering:true,
        data : player.awards
    }
    $rootScope.$on('seasonchanged',function(){
        SetupSinglePlayerGrids(api,player,$stateParams,$scope,$http);
    })
    $timeout(function(){


    SetupSinglePlayerGrids(api,player,$stateParams,$scope,$http);
    },0)
};

var SetupSinglePlayerGrids = function(api,player,$stateParams,$scope,$http){
    $http.get(api+'/api/players/'+$stateParams.id + '/totals').success(function(result){
        for(var i in result){
            result[i]['leaguename'] =  result[i]['league.name']
        }
        $scope.gridCarreerTotal.data = result;
    })
    $http.get(api+'/api/players/'+$stateParams.id + '/highlights').success(function(result){
        $scope.gridCarreerHighlight.data = result;
    })
    $http.get(api+'/api/players/'+$stateParams.id + '/transfers').success(function(result){
        $scope.gridCarreerTransfers.data = result;
    })

}