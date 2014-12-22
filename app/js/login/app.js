(function(){
	var loginModule = angular.module('app.login',['ui.router','app.common']);

	loginModule.config(["$stateProvider", function($stateProvider){
		$stateProvider.state('login', {
	      url: "/login",
	      views:{
	      	"main" : {
	      		controller : "LoginCtrl",
	      		templateUrl: "login/views/login.html"
	      	}
	      }
	    });
	}]);
}());