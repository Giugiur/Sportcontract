(function(){
    'use strict';

    var teamResults = function() {
        return {
            restrict: 'E',
            templateUrl: 'quicksearch/views/teamResultsDirective.html'
        };
    };

    var quicksearchModule = angular.module('app.quicksearch');
    quicksearchModule.directive('teamResults',[teamResults]);
}());