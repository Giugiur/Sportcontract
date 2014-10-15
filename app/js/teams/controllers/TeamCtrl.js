var TeamCtrl = function($scope, $http, Storage, $state, $stateParams, teams,seasons,league,
                        api, ngProgress ,$timeout,$anchorScroll,$location,$rootScope) {
  
  $scope.teams = teams;
  $scope.leaders ;
  $scope.seasons = seasons;
  $scope.league = league;
  $scope.season=  $stateParams.season?$stateParams.season:2013;


  $scope.scrollTo = function(i){
      $location.hash(i);

      // call $anchorScroll()
      $anchorScroll();
  }

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
  $scope.gridTransfers = {columnDefs : [
      {name : 'From',field:'fromTeam.name'},
      {name : 'To',field:'toTeam.name'},
      {name : 'Date',field:'transferDate'}
  ],enableFiltering:true};
    $scope.gridAwards = {columnDefs : [
        {name : 'Name',field:'name'}
    ],enableFiltering:true};
    $scope.gridFreeAgents = {
        columnDefs : [
            {name : 'Player',
                cellTemplate: '<span>{{row.entity.firstName}} {{row.entity.lastName}}</span>'},
            {name : 'Team',field:'latestPlayerStats.team.name'},
            {name : 'GP',field:'latestPlayerStats.GP'},
            {name : 'G',field : 'latestPlayerStats.G'},
            {name : 'A',field:'latestPlayerStats.A'},
            {name : 'TP',field:'latestPlayerStats.TP'},
            {name : 'PPG',field:'latestPlayerStats.PPG'},
            {name : 'PIM',field:'latestPlayerStats.PIM'}


        ],
        enableFiltering:true
    }
    $scope.gridChampions = {
        columnDefs : [
            {
                name : 'Season', field : 'season.name'
            },{
                name : 'Team',field:'team.name'
            }
        ]
    }
    $rootScope.$on('seasonchanged',function(){
        SetupTeamGrids(api,$scope.teams,$stateParams,$scope,$http);
    })
    $timeout(function(){
        SetupTeamGrids(api,$scope.teams,$stateParams,$scope,$http);
    },0)


};

var SetupTeamGrids = function(api,teams,$stateParams,$scope,$http){
    /**standings **/

    $scope.gridStandings.data =  _.sortBy(teams,function(item){return item.position;});


    /**stats**/
    $http.get(api + '/api/leagues/' + $stateParams.id + '/players' ).success(function(players){
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
    $http.get(api + '/api/leagues/' + $stateParams.id + '/transfers').success(function(players){
        $scope.gridTransfers.data = players;
    })
    /*
     *  Awards
     */
    $http.get(api + '/api/leagues/' + $stateParams.id + '/awards').success(function(awards){
        $scope.gridAwards.data = players;
    })

    $http.get("http://api.eliteprospects.com/beta/players?filter=" +
        "(playerPosition!%3Dgoalie%26contract%3D13%2F14%26latestPlayerStats.season.startYear%3D2013%26playerStatus%3Dactive%26" +
        "latestPlayerStats.league.id%3D"+ $stateParams.id +")").success(function(agents){
        $scope.gridFreeAgents.data = agents;
    })
    $http.get(api + '/api/leagues/' + $stateParams.id + '/champions').success(function(champions){
        $scope.gridChampions.data = agents;
    })
    $http.get(api + '/api/leagues/' + $stateParams.id + '/leaders').success(function(leaders){
        $scope.leaders = leaders;
    })
}