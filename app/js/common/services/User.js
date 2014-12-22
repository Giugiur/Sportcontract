(function(){
    'use strict';

    var User = function($http,api,$q,Season){
        var self = this;
        self.user;

        self.setUser = function(user){
            self.user = user;
        };

        self.getUser = function(){
            return self.user;
        }

        self.setSeason = function(season){
            self.user.season = season;
            Season.setSeason(season);
            self.$save();
        }

        self.$save = function(){
            var deferred = $q.defer();
            $http.put(api + "/api/users/" + self.user._id,self.user).success(function(result){
                deferred.resolve(result);
            })
            return deferred.promise;
        }

        return self;
    };

    var commonModule = angular.module('app.common');
    commonModule.service('User',['$http','api','$q','Season', User]);    
}());