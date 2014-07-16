var CountriesCtrl = function($scope,$http, Storage, $translatePartialLoader) {
  $scope.countries;
  var storageCountries = Storage.init('api/countries',true,{});
  storageCountries.find(function(item){
	  	return item.games.length>0;
	  }).then(function(outcome){
	  	$scope.countries = outcome;
	  })
  

};