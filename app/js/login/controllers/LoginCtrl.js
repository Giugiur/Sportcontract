var LoginCtrl = function($scope,$http,api,$state,User) {
  $scope.login = function(username,password){
  	$http.post(api + '/api/users/login',{
  		username : username,
  		password : password
  	}).success(function(result){
  		User.setUser(result.object);
  		$state.go('dashboard.countries');
  	})
  }
};