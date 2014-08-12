var SettingsCtrl = function($scope, $http, User) {
  	$scope.date = new Date();
  	$scope.User = User;
  	$scope.user = User.getUser();
	console.log("tre");
}