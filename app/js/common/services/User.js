(function(){
    'use strict';

    var User = function($http,api,$q,Season){
        var user;

        var $save = function(){
            if(typeof user === "undefined"){
                throw "Can't save user object because it not exists yet!";
            }

            var deferred = $q.defer();
            $http.put(api + "/api/users/" + user._id,user).success(function(result){
                deferred.resolve(result);
            });

            return deferred.promise;
        };

        var setUser = function(userObject){
            if(typeof userObject === "undefined"){
                throw "You must pass 'user' to function setUser";
            }

            user = userObject;
        };

        var getUser = function(){
            return user;
        };

        var setSeason = function(season){
            if(typeof season === "undefined"){
                throw "You must pass 'season' to function setSeason";
            }

            user.season = season;
            Season.setSeason(season);
            $save();
        };

        return {
            "setUser": setUser,
            "getUser": getUser,
            "setSeason": setSeason,
            "$save": $save
        };
    };

    var commonModule = angular.module('app.common');
    commonModule.service('User',['$http','api','$q','Season', User]);
}());