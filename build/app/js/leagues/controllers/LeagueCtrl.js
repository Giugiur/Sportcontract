var LeagueCtrl = function($scope, $http, Storage, $state, $stateParams, Tabs,api,associations,country,ngProgress) {
  
  $scope.associations = associations;
  $scope.country = country;
  console.log($scope.associations)


  $scope.goLeague = function(object){
      Tabs.goTo('dashboard.teams',object, "Teams in " + object.name);

  }
    $scope.goTeam = function(object){
        object.season = $scope.season;
        Tabs.goTo('dashboard.players',object, "Players in " + object.name);

    }
    $scope.getFlag = function(country){
        return country.flag?country.flag:'http://beta.eliteprospects.com/images/flags/64/' + country['iso3166_3'] +'.png';
    }
};