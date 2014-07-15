var LoginCtrl = function($scope,$http,api,$state) {
  $scope.login = function(username,password){
  	$http.post(api + '/api/users/login',{
  		username : username,
  		password : password
  	}).success(function(result){
  		$state.go('dashboard.countries');
  	})
  }
};