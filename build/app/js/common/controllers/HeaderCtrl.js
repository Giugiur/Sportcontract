var HeaderCtrl = function($scope,User,Languages,$translate,$rootScope, $location, $state) {
 	$scope.user = User.getUser();
 	$scope.languages = Languages.getLanguages();
 	$scope.dropdown = false;
 	$scope.hideSearch = false;

    if($state.is('calendar'))
        $scope.hideSearch = true;

 	$scope.setDropdown = function(i){
 		$scope.dropdown = i;
 	}
    $scope.home = function(){
        $state.go("dashboard.countries",{});
    }
    $scope.changeLanguage = function(language){
 		$translate.use(language);
 		$translate.refresh();
 	}
};