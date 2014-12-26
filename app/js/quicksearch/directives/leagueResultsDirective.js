(function(){
    'use strict';

    var leagueResults = function() {
        return {
            restrict: 'E',
            templateUrl: 'quicksearch/views/leagueResultsDirective.html'
        };
    };

    var quicksearchModule = angular.module('app.quicksearch');
    quicksearchModule.directive('leagueResults',[leagueResults]);
}());