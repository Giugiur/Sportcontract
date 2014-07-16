var CountriesCtrl = function($scope,$http, Storage, $state, Tabs) {
  $scope.countries;
  var storageCountries = Storage.init('api/countries',true,{});
  storageCountries.find(function(item){
	  	return item.games.length>0;
	  }).then(function(outcome){
	  	$scope.countries = outcome;
	  })
  


  $scope.goCountry = function(object){
  	Tabs.newTab('Leagues of ' +object.name,'dashboard.leagues',object)
  }

};