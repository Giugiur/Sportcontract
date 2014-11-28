angular.module('app.common').directive('season',['$rootScope','User','$state','Season',
    function($rootScope,User,$state,Season) {
    return {
        restrict: 'E',
        scope: {

        },
        transclude : true,
        template: '<select ng-model="selectedSeason.val" ' +
            'ng-options="season.name as season.display for season in seasons"' +
            ' ng-change="changed();">' +
            '</select>',
        link : function link(scope, element, attrs) {
            scope.selectedSeason = {
                val : Season.getSeason()
            }
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
            scope.changed = function(){
                User.setSeason(scope.selectedSeason.val);
                $state.go($state.$current, null, { reload: true });
                $rootScope.$emit('seasonchanged');
            }
        }

    };
}])