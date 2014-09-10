var TeamCtrl = function($scope, $http, Storage, $state, $stateParams, teams,seasons,leaders,league,api, ngProgress ,$timeout) {
  
  $scope.teams = teams;
  $scope.leaders = leaders;
  $scope.seasons = seasons;
  $scope.league = league;
  $scope.season=  $stateParams.season?$stateParams.season:2013;


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


    /**
     * extras**
     *
     */
//,GP,W,L,OTW,OTL,GF,GA,TP
  $scope.gridStandings = {
      columnDefs : [
          {name:'',field:'position'},
          {name:'Team',field:'team.name'},
          {name:'GP',field:'GP'},
          {name:'W',field:'W'},
          {name:'L',field:'L'},
          {name:'OTW',field:'OTW'},
          {name:'OTL',field:'OTL'},
          {name:'GF',field:'GF'},
          {name:'GA',field:'GA'},
          {name:'TP',field:'TP'}

      ]
  };
    //GP	G	A	TP	PPG	PIM
  $scope.gridStatsPlayers = {
      columnDefs : [
          {name : 'Player',
              cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},
          {name : 'Team',field:'team.name'},
          {name : 'GP',field:'GP'},
          {name : 'G',field : 'G'},
          {name : 'A',field:'A'},
          {name : 'TP',field:'TP'},
          {name : 'PPG',field:'PPG'},
          {name : 'PIM',field:'PIM'}


          ],
      enableFiltering:true};
  $scope.gridStatsGoalies = {columnDefs : [
      {name : 'Player',
          cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},
      {name : 'Team',field:'team.name'},
      {name : 'GP',field:'GP'},
      /**{name : 'G',field : 'G'},
      {name : 'A',field:'A'},
      {name : 'TP',field:'TP'},
      {name : 'PPG',field:'PPG'},
      {name : 'PIM',field:'PIM'}**/


  ],enableFiltering:true};
  $scope.gridStatsPlayersAllTime = {
      columnDefs : [
          {name : 'Firstname',field:'firstname'},
          {name : 'Lastname',field:'lastname'},
          {name : 'GP',field:'GP'},
          {name : 'G',field : 'G'},
          {name : 'A',field:'A'},
          {name : 'TP',field:'TP'},
          {name : 'PPG',field:'PPG'},
          {name : 'PIM',field:'PIM'}


      ],enableFiltering:true};
  $scope.gridInjured = {columnDefs : [
      {name : 'Firstname',field:'player.firstName'},
      {name : 'Lastname',field:'player.lastName'},
      {name : 'Team',field:'team.name'}


  ],enableFiltering:true};
  $scope.gridTransfers = {enableFiltering:true};


      SetupTeamGrids(api,$scope.teams,$stateParams,$scope,$http);

};

var SetupTeamGrids = function(api,teams,$stateParams,$scope,$http){
    /**standings **/

    $scope.gridStandings.data =  _.sortBy(teams,function(item){return item.position;});
    console.log("hallo",$http);

    /**stats**/
    $http.get(api + '/api/leagues/' + $stateParams.id + '/players').success(function(players){
        $scope.gridStatsPlayers.data =  players['SKATER'];
        $scope.gridStatsGoalies.data =  players['GOALIE'];
    })

    /**
     * Player stats all time
     */
    $http.get(api + '/api/leagues/' + $stateParams.id + '/playerstats').success(function(players){
        $scope.gridStatsPlayersAllTime.data= _.map(players,function(item){
            item.firstname = item['player.firstName'];
            item.lastname = item['player.lastName'];
            delete item['player.firstName'];
            delete item['player.lastName'];
            return item;
        });
    })

    /*
    * Injured Players
     */
    $http.get(api + '/api/leagues/' + $stateParams.id + '/injured').success(function(players){
        $scope.gridInjured.data = players;
    })
    /*
    *  Transfer
     */
    $http.get(api + '/api/leagues/' + $stateParams.id + '/tranfers').success(function(players){
        $scope.gridTransfers.data = players;
    })
}