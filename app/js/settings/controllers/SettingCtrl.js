var SettingsCtrl = function($scope, $http, User, languages, $translate) {
  	$scope.date = new Date();
  	$scope.User = User;
  	$scope.user = User.getUser();

    $scope.languages = languages;

    $scope.$watch('user.profile.language', function(lang){
        //console.log(lang);
        $translate.use(lang);
    });
}