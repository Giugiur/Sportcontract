angular.module('app.common').service('Tabs',['$state',function($state){
	var self = this;
	self.tabs = [];

	var guid = (function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	               .toString(16)
	               .substring(1);
	  }
	  return function() {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	           s4() + '-' + s4() + s4() + s4();
	  };
	})();

	self.initTabs = function(){
		self.tabs = [{
			state : "dashboard.countries",
			params : {},
			name: "Home",
			href : $state.href("dashboard.countries",{}),
			id : guid()
		}]
	}
	self.newTab = function(name,state,params){
		self.tabs.push({
			state : state,
			params : params,
			name : name,
			href : $state.href(state,params),
			id : guid()
		})
		$state.go(state,params);
	}
	self.closeTab = function(id){
		var temp  = _.filter(self.tabs,function(item){
			return !item.id == id;
		})
		self.tabs.length = 0;
		for(var i in temp){
			self.tabs.push(temp[i]);
		}
	}
	self.setTabs = function(tabs){
		
	}
	self.getTabs = function(){
		return self.tabs;
	}
	return self;
}])