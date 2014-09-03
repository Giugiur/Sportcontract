angular.module('formCreator', [])
    .directive('formElement', function() {
        return {
            require: ['form'],
            restrict: 'E',
            transclude: true,
            scope: {
                title: '=',
                edit:'=',
                type:'='
            },
            link: function(scope, element, attrs) {

            },
            templateUrl: 'form_creator/views/formElement.html'
        };
    });