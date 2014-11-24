var CountriesCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,countries) {

  $scope.countries = countries;

  $scope.goCountry = function(object){
    Tabs.goTo('dashboard.leagues',object, "Leagues in " + object.name);
  }
  $scope.getFlag = function(country){
  	return country.flag?country.flag:'/img/flags/' + country.name.toLowerCase().replace(/\s/g, "") + '.jpg';
  }
};