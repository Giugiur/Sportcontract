var CountriesCtrl = function($scope,$http, Storage) {
  $scope.countries;


  var storageCountries = Storage.init('api/countries',true,{});
  storageCountries.find(function(item){
	  	return item.games.length>0;
	  }).then(function(outcome){
	  	$scope.countries = outcome;
	  	for(var i in $scope.countries){
	  		console.log($scope.countries[i].flag)
	  	}
	  })
  

};