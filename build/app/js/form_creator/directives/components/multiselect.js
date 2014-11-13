angular.module('formCreator')
    .directive('formmulti', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                settings : '='
            },
            link: function(scope, element, attrs) {
                scope.delete = function(){
                    scope.settings.type = undefined;
                }
                scope.addOption = function(){
                    if(!_.isArray(scope.settings.options)){
                        scope.settings.options = [];
                    }
                    scope.settings.options.push({
                        value : 'New skill'
                    });
                }
                scope.deleteOption = function(value){
                    scope.settings.options = _.reject(scope.settings.options,function(option){
                        return option.value == value.value;
                    })
                }
            },
            templateUrl: 'form_creator/views/components/multiselect.html'
        };
    });