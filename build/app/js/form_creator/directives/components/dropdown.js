angular.module('formCreator')
    .directive('formdropdown', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                settings: '='
            },
            link: function(scope, element, attrs) {
                scope.delete = function(){
                    scope.settings.type = undefined;
                }
                scope.addOption = function(value){
                    if(!_.isArray(scope.settings.options)){
                        scope.settings.options = [];
                    }
                    scope.settings.options.push(value);
                }
                scope.deleteOption = function(value){
                    scope.settings.options = _.reject(scope.settings.options,function(option){
                        return option.value == value.value;
                    })
                }
            },
            templateUrl: 'form_creator/views/components/dropdown.html'
        };
    });