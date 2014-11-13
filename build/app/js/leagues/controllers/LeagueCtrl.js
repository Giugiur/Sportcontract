var LeagueCtrl = function($scope, $http, Storage, $state, $stateParams, Tabs,api,associations,country,ngProgress) {
  
  $scope.associations = associations;
  $scope.country = country;
  console.log($scope.associations)


  $scope.goLeague = function(object){
  	$state.go('dashboard.teams',object);
  }
    $scope.goTeam = function(object){
        object.season = $scope.season;
        $state.go('dashboard.players',object);
    }
    $scope.getFlag = function(country){
        return country.flag?country.flag:'http://beta.eliteprospects.com/images/flags/64/' + country['iso3166_3'] +'.png';
    }
};