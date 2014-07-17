var DashboardCtrl = function($scope,Tabs,$state,$rootScope) {
	Tabs.initTabs();
  	$scope.tabs = Tabs.getTabs();
  	$scope.Tab = Tabs;
  	

  	$scope.active = function(state){
  		if($state.href(state.state,state.params) == '#' + window.location.href.split('#')[1]){
  			return "active";
  		}else{
  			return "";
  		}
  	}
};