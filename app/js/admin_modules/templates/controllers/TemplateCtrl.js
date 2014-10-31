var TemplateCtrl = function($scope,$state,User) {
    $scope.$state = $state;

    $scope.user = User.getUser();

    if(!$scope.user.templates){
        $scope.user.templates = [];
    }


    $scope.createNew =function(){
        $scope.templates.push({
            name : 'New template',
            components : []

        });
        $scope.save();
    }
    $scope.$watch('user',function(){
        if($scope.user){
            $scope.templates = angular.copy($scope.user.templates);
        }
    })
    $scope.save = function(){
        $scope.user.templates = $scope.templates;
        User.$save();
    }
};