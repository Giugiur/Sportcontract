var SettingsCtrl = function($scope, $http, User, languages) {
  	$scope.date = new Date();
  	$scope.User = User;
  	$scope.user = User.getUser();
	console.log(languages);
}