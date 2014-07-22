var CountriesCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,countries) {
  ngProgress.complete();


  $scope.countries = countries;
  
  


  $scope.goCountry = function(object){
  	$state.go('dashboard.leagues',object);
  }

};