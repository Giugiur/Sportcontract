(function(){
    'use strict';

    var playerResults = function() {
        return {
            restrict: 'E',
            templateUrl: 'quicksearch/views/playerResultsDirective.html'
        };
    };

    var quicksearchModule = angular.module('app.quicksearch');
    quicksearchModule.directive('playerResults',[playerResults]);
}());