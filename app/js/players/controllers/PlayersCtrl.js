var PlayersCtrl = function($scope, $http, Storage, $state, $stateParams, players,seasons,team, ngProgress,api,$anchorScroll,$location,$filter) {


  $scope.team = team;
  $scope.players=players;
  $scope.seasons = seasons;
  $scope.season=$stateParams.season?$stateParams.season:2013;


    $scope.scrollTo = function(i){
        $location.hash(i);

        // call $anchorScroll()
        $anchorScroll();
    }
  $scope.goPlayer = function(object){
  	object.season = $scope.season;
      console.log(object);
  	$state.go('dashboard.player',object);
  }
  $scope.changeSeason = function(){

  	var temp = {
  		id : $stateParams.id,
  		season : $scope.season
  	}
    for(var i in $scope.players){
        $scope.players[i].age = $filter('age')($scope.players[i].dateOfBirth);
    }
  	window.location.href = $state.href($state.current.name,temp);
  }

    $scope.gridRoster={
        enableFiltering:true,
        columnDefs : [
            {name : 'Player',
                cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},
            {name : 'Age',
                cellTemplate: '<span>{{row.entity.player.dateOfBirth | age}}</span>'},
            {name : 'Born',field : 'player.dateOfBirth'},
            {name : 'Birthplace', field :'player.country.name'},
            {name : 'HT',field : 'player.height'},
            {name : 'WT',field : 'player.weight'},
            {name : 'Shoots', field : 'player.shoots'}
        ],
        data : $scope.players
    }
  $scope.gridStatsPlayers={
      columnDefs : [
          {name : 'Player',
              cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},

          {name : 'GP',field:'GP'},
          {name : 'G',field : 'G'},
          {name : 'A',field:'A'},
          {name : 'TP',field:'TP'},
          {name : 'PPG',field:'PPG'},
          {name : 'PIM',field:'PIM'}


      ],
      enableFiltering:true
  }
  $scope.gridStatsGoalies = {
      columnDefs : [
          {name : 'Player',
              cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},

          {name : 'GP',field:'GP'},
      /**{name : 'G',field : 'G'},
       {name : 'A',field:'A'},
       {name : 'TP',field:'TP'},
       {name : 'PPG',field:'PPG'},
       {name : 'PIM',field:'PIM'}**/


      ],
      enableFiltering:true};
    $scope.gridRetired = {
        columnDefs : [
            {name : 'Player',
                cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'}

        ],
        enableFiltering:true};
  $scope.gridStatsTeam = {
      enableFiltering:true};
  $scope.gridTeamCaptains = {
      columnDefs : [
          {name : 'Jersey',
            field: 'jerseyNumber'},
          {name : 'Player',
              cellTemplate: '<span>{{row.entity.player.firstName}} {{row.entity.player.lastName}}</span>'},

          {name : 'GP',field:'GP'},
        {name : 'G',field : 'G'},
       {name : 'A',field:'A'},
       {name : 'TP',field:'TP'},
       {name : 'PPG',field:'PPG'},
       {name : 'PIM',field:'PIM'}


      ],
      enableFiltering:true};
  $scope.gridTopPlayers = {
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
  $scope.gridTopPlayersAll = {columnDefs : [
      {name : 'Firstname',field:'firstname'},
      {name : 'Lastname',field:'lastname'},
      {name : 'GP',field:'GP'},
      {name : 'G',field : 'G'},
      {name : 'A',field:'A'},
      {name : 'TP',field:'TP'},
      {name : 'PPG',field:'PPG'},
      {name : 'PIM',field:'PIM'}


  ],enableFiltering:true};
  $scope.gridTransfers = {columnDefs : [
      {name : 'From',field:'fromTeam.name'},
      {name : 'To',field:'toTeam.name'},
      {name : 'Date',field:'transferDate'}
  ],enableFiltering:true};
    $scope.gridTeamStaff = {columnDefs : [
        {name : 'Firstname',field:'staff.firstName'},
        {name : 'Lastname',field:'staff.lastName'},
        {name : 'Staff Role',field:'staffRole'}
    ],enableFiltering:true};
  $scope.affiliates;
  SetupPlayerGrids(api,players,$stateParams,$scope,$http);
};

var SetupPlayerGrids = function(api,players,$stateParams,$scope,$http){
    /**stats**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/players?fields=GP,G,A,TP,PPG,PIM,player.firstname,player.lastname,country,playerPosition').success(function(players){
        $scope.gridStatsPlayers.data = _.where(players,{playerPosition:'SKATER'});
        $scope.gridStatsGoalies.data =  _.where(players,{playerPosition:'GOALIE'});
    })

    /**teamstats**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/history').success(function(teams){
        $scope.gridStatsTeam.data = teams;
    })
    /**teamcaptains**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/captains').success(function(teams){
        $scope.gridTeamCaptains.data = teams;
    })
    /**staff**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/staff').success(function(teams){
        $scope.gridTeamStaff.data = teams;
    })
    /**topplayers**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/players/top/current').success(function(teams){

        $scope.gridTopPlayers.data = _.map(teams,function(item){
            item.firstname = item['player.firstName'];
            item.lastname = item['player.lastName'];
            delete item['player.firstName'];
            delete item['player.lastName'];
            return item;
        });
    })
    /**topplayers all time**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/players/top/all').success(function(teams){
        $scope.gridTopPlayersAll.data = _.map(teams,function(item){
            item.firstname = item['player.firstName'];
            item.lastname = item['player.lastName'];
            delete item['player.firstName'];
            delete item['player.lastName'];
            return item;
        });
    })
    /**topplayers all time**/
    $http.get(api + '/api/teams/' + $stateParams.id + '/transfers').success(function(teams){
        $scope.gridTransfers.data = teams;
    })
    $http.get('http://api.eliteprospects.com/beta/teams/' + $stateParams.id +'/affiliates').success(function(teams){
        $scope.affiliates = teams;
    })


}