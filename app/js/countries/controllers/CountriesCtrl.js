var CountriesCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,countries) {
 


  $scope.countries = countries;
  
  


  $scope.goCountry = function(object){
  	$state.go('dashboard.leagues',object);
  }

};