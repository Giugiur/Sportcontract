(function(){
    'use strict';

    var Languages = function($http,api){
        var languages = [];

        var getLanguages = function(){
            return languages;
        };

        var getLanguagesCallback = function(result){
            for(var i in result){
                if(result.hasOwnProperty(i)){
                    languages.push(result[i]);
                }
            }
        };

        var init = function(){
            $http.get(api + '/api/getLanguages').success(getLanguagesCallback);
        };

        init();

        return {
            "getLanguages": getLanguages
        };
    };

    var commonModule = angular.module('app.common');
    commonModule.service("Languages", ["$http", "api", Languages]);
}());