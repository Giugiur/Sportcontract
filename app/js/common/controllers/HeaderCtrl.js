var HeaderCtrl = function($scope,User,Languages,$translate,$rootScope, $location) {
 	$scope.user = User.getUser();
 	$scope.languages = Languages.getLanguages();
 	$scope.dropdown = false;
 	
 	$scope.setDropdown = function(i){
 		$scope.dropdown = i;
 	}
    $rootScope.onPage = function(url){
        return $location.path() == url;
    }

    $scope.changeLanguage = function(language){
 		$translate.use(language);
 		$translate.refresh();
 	}
};