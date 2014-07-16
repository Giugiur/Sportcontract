var DashboardCtrl = function($scope,Tabs,$state) {
	Tabs.initTabs();
  	$scope.tabs = Tabs.getTabs();
  	$scope.Tab = Tabs;
};