(function(){
    'use strict';

    var LoginCtrl = function($scope,$http,api,$state,User,Tabs) {
        $scope.login = function(username,password){
            $http.post(api + '/api/users/login',{
                username : username,
                password : password
            }).success(function(result){
                User.setUser(result.object);
                Tabs.setActive();
            });
        };
    };

    var loginModule = angular.module('app.login');
    loginModule.controller("LoginCtrl", ["$scope", "$http", "api", "$state", "User", "Tabs", LoginCtrl]);
}());