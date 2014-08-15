angular.module('app.video').directive('video',['api','$http','$rootScope', function(api,$http,$rootScope) {
    return {
      restrict: 'E',
      scope: {
        
      },
      transclude : true,
      templateUrl: 'video/views/video.html',
      link : function link(scope, element, attrs) {
	     
	  }
    };
  }])