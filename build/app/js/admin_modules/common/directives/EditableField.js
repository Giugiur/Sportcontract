angular.module('app.admin').directive('editablefield',[function() {
    return {
      restrict: 'E',
      scope: {
        'model': '=',
        'editing': '='
      },
      templateUrl: 'admin_modules/common/views/editablefield.html',
      link : function link(scope, element, attrs) {
	     
	  }
    };
  }])