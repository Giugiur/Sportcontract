'use strict';

angular.module('app.search')
    .directive('seasonSelect', function(){
        return {
            restrict: 'E',
            replace : true,
            require : '^ngModel',
            scope : {
                ngModel: '=',
                change:'&onChange'
            },
            template: '<select class="season" ng-change="change()">' +
                '<option ng-selected="{{season.val == ngModel}}" ng-repeat="season in seasons" value="{{season.val}}">{{season.text}}</option>' +
                '</select>',
            link: function(scope, elem, attrs){
                scope.seasons = [];

                var currentMonth = Number(moment().format('MM'));
                var currentYear = Number(moment().format('YYYY'));
                var seasonFirst = 1944;

                var curSeasonStart = currentYear;

                if(currentMonth < 5){
                    curSeasonStart = currentYear - 1;
                }

                var back = (curSeasonStart+1)-seasonFirst; //years to go back in the stats;

                for( var i = -1; i <= back; i++){
                    scope.seasons.push({val:curSeasonStart-i,text:(curSeasonStart-i)+"/"+(curSeasonStart+1-i)});
                }

                scope.$watch('ngModel', function(newval, oldval){
                    if(newval){
                        scope.$parent.seasonVal = newval;
                    }
                })

            }
        }
    });
