(function(){
    'use strict';

    var countryResults = function() {
        return {
            restrict: 'E',
            templateUrl: 'quicksearch/views/countryResultsDirective.html'
        };
    };

    var quicksearchModule = angular.module('app.quicksearch');
    quicksearchModule.directive('countryResults',[countryResults]);
}());