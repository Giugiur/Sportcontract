(function(){
    'use strict';

    var staffResults = function() {
        return {
            restrict: 'E',
            templateUrl: 'quicksearch/views/staffResultsDirective.html'
        };
    };

    var quicksearchModule = angular.module('app.quicksearch');
    quicksearchModule.directive('staffResults',[staffResults]);
}());