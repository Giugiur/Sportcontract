var CountriesCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,countries) {

  $scope.countries = countries;

  $scope.goCountry = function(object){
  	$state.go('dashboard.leagues',object);
  }
  $scope.getFlag = function(country){
  	return country.flag?country.flag:'/img/flags/' + country.name.toLowerCase().replace(/\s/g, "") + '.jpg';
  }
};