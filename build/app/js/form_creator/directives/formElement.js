angular.module('formCreator', [])
    .directive('formelement', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                settings : '=',
                all : '='
            },
            link: function(scope, element, attrs) {
                scope.delete = function(component){
                    var index;
                    for(var i in scope.all){
                        if(scope.all[i].name == component.name){
                            index = i;
                        }
                    }
                    if(index){

                            scope.all.splice(index,1);


                    }

                }
            },
            templateUrl: 'form_creator/views/formElement.html'
        };
    });