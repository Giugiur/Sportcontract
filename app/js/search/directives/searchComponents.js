'use strict';

angular.module('app.search')
    .directive('scCountry', ['$http','Storage', function ($http,Storage){
        return {
            restrict: 'E',
            replace : true,
            require : '^advancedSearch',
             scope : {
                class : '@',
                options : '=',
                ngModel : '=',
                conditions : '='
            },
            template : '<select class="class"><option value="">Select Country</option><option ng-selected="{{cou.name == ngModel}}" ng-repeat="cou in countryCollection" value="{{cou.name}}">{{cou.name}}</option></select>',
            link : function(scope,elem,attr,advancedSearchCtrl){
                var storageCountries = Storage.init('api/countries',true,{});
                  storageCountries.all().then(function(outcome){
                        scope.countryCollection = outcome;
                      })

                

                scope.$watch('conditions',function(newval){
                    angular.forEach(newval, function(cond){
                       var index = scope.options.indexOf(cond.value);
                        scope.options.splice(index,1);
                    });
                });

                var ctrl = advancedSearchCtrl;

                ctrl.getCurrentFilters();

                scope.$watch('ngModel', function(newval){
                    scope.$parent.filter.condition.value = newval;

                });


            }
        }

    }])
    .directive('scLeague', ['$http','Storage', function ($http,Storage){
        return {
            restrict: 'E',
            replace : true,
            require : '^advancedSearch',
            scope : {
                options : '=',
                class : '@',
                ngModel : '='
            },
            template : '<select class="class"><option value="">Select League</option><option ng-selected="{{lea.name == ngModel}}" ng-repeat="lea in leagueCollection" value="{{lea.name}}">{{lea.name}}</option></select>',
            link: function (scope, elem, attrs, advancedSearchCtrl) {
                var storageLeagues = Storage.init('api/leagues',true,{});
                  storageLeagues.all().then(function(outcome){
                        scope.leagueCollection = outcome;
                      })
               

                scope.$watch('ngModel', function(newval){
                   scope.$parent.filter.condition.value = newval;
                });



    }
}

}])
    .directive('scDefault', function (){
        return {
            restrict: 'E',
            replace : true,
            require : '^advancedSearch',
            scope : {
                options : '=',
                class : '@',
                ngModel : '='
            },
            template : '<select class="class"><option value="">Select Value</option><option ng-selected="{{val == ngModel}}" ng-repeat="val in options" value="{{val}}">{{val}}</option></select>',
            link: function (scope, elem, attrs, advancedSearchCtrl) {


                scope.$watch('ngModel', function(newval){
                    scope.$parent.filter.condition.value = newval;
                });



            }
        }

    })
    .directive('scRelation', function(){
        return{
            restrict : 'E',
            replace : true,
            scope : {
                model : '=',
                relations : '='
            },
            template : '<select class="search-filter-relation" ng-model="model.relation" ng-options="relation.key as relation.val for relation in rels"></select>',
            link : function(scope,elem,attr){


                scope.rels = scope.relations;

                scope.$watch('model.relation', function(newval){
                    //console.log(newval);
                });
            }
        }
    })
    .directive('scOperator', function(){
        return{
            restrict : 'E',
            replace : true,
            scope : {
                model : '=',
                operators : '='
            },
            template : '<select class="search-filter-operator" ng-model="model.operator" ng-options="op for op in ops"></select>',
            link : function(scope,elem,attr){

                scope.ops = scope.operators;

                scope.$watch('model.operator', function(newval){
                    //console.log(newval);
                });
            }
        }
    })
    .directive('scActive', function(){
        return{
            restrict : 'E',
            replace : true,
            scope : {
                model : '='
            },
            template : '<input type="checkbox" ng-model="model.active"/>',
            link : function(scope,elem,attr){

                scope.$watch('model.active', function(newval){
                    //console.log(newval);
                });
            }
        }
    }).directive('scRemove', function(){
        return{
            restrict : 'E',
            replace : true,
            scope : {
                model : '='
            },
            template : '<a class="btn btn-danger" ng-click="removeFilter(model)">remove</a>',
            controller : function($scope){

                $scope.removeFilter = function(model){
                    //console.log(model);
                }
            }
        }
    });

