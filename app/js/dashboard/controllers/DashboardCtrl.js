var DashboardCtrl = function($scope,Tabs,$state,$rootScope) {
	  Tabs.initTabs();
  	$scope.tabs = Tabs.getTabs();
  	$scope.Tab = Tabs;
  	

  	
};