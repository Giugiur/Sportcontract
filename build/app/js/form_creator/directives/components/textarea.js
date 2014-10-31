angular.module('formCreator')
    .directive('formarea', function() {
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
            },
            templateUrl: 'form_creator/views/components/textarea.html'
        };
    });