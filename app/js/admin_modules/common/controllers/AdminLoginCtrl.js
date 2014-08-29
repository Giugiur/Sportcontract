var AdminLoginCtrl = function($scope,User,$modalInstance,$http,api) {
    $scope.login = function(username,password){
        $http.post(api + '/api/users/login',{
            username : username,
            password : password
        }).success(function(result){
            User.setUser(result.object);
            $modalInstance.close();
        })
    }


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};