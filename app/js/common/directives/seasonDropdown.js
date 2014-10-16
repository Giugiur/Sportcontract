angular.module('app.common').directive('season',['$rootScope','User', function($rootScope,User) {
    return {
        restrict: 'E',
        scope: {

        },
        transclude : true,
        template: '<select ng-model="selectedSeason.val" ng-options="season.name as season.display for season in seasons">' +
            '</select>',
        link : function link(scope, element, attrs) {
            scope.selectedSeason = {
                val : 2014
            };
            scope.seasons = [
                {
                    name : 2014,
                    display : "2014/2015"
                },
                {
                    name : 2013,
                    display : "2013/2014"
                },
                {
                    name : 2012,
                    display : "2012/2013"
                },
                {
                    name : 2011,
                    display : "2011/2012"
                }
            ]
            scope.$watch('selectedSeason',function(){
                User.setSeason(scope.selectedSeason.val);
                $rootScope.$emit('seasonchanged');
            });
        }

    };
}])