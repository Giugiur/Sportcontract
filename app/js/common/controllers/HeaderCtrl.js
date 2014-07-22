var HeaderCtrl = function($scope,User,Languages,$translate,$rootScope) {
 	$scope.user = User.getUser();
 	$scope.languages = Languages.getLanguages();
 	$scope.dropdown = false;
 	
 	$scope.setDropdown = function(i){
 		$scope.dropdown = i;
 	}

 	$scope.changeLanguage = function(language){
 		$translate.use(language);
 		$translate.refresh();
 	}
};