var CountriesCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,countries) {

  $scope.countries = countries;

  $scope.goCountry = function(object){
  	$state.go('dashboard.leagues',object);
  }
  $scope.getFlag = function(country){
  	return country.flag?country.flag:'http://beta.eliteprospects.com/images/flags/64/' + country['iso3166_3'] +'.png';
  }
};