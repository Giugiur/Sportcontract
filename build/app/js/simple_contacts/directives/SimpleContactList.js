angular.module('app.simple_contact').directive('simplecontact',['api','$http','$rootScope','Tabs', function(api,$http,$rootScope,Tabs) {
    return {
        restrict: 'E',
        scope: {
            'teamid' : '='
        },
        transclude : true,
        templateUrl: 'simple_contacts/views/simple_contacts.html',
        link : function link(scope, element, attrs) {
            scope.staff;
            scope.reverse = true;
            $http.get(api + '/api/teams/' + scope.teamid + '/staff').success(function(result){
                scope.staff = result;
            })
        }

    };
}])