var SettingsCtrl = function($scope, $http, ) {
  
  
	$scope.getNow = function(){
		return new Date().getTime();
	}
};