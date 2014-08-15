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
		var tabs = JSON.parse(localStorage.getItem('tabs'));
		console.log(tabs);
		if(tabs && tabs.length>0){
			self.tabs = tabs;
		}else{
			self.tabs = [{
				state : "dashboard.countries",
				params : {},
				name: "Home",
				href : $state.href("dashboard.countries",{}),
				id : guid()
			}]
		}
		$state.go(self.tabs[0].state,self.tabs[0].params);
	}
	self.newTab = function(name,state,params){
		self.tabs.push({
			state : state,
			params : params,
			name : name,
			href : $state.href(state,params),
			id : guid()
		})
		self.save();
		$state.go(state,params);
	}
	self.closeTab = function(tab){
		var index ;
 
		for(var i in self.tabs){
			if(self.tabs[i].id == tab.id){
				index = i;
			}
		}
		console.log(index);
		if(index !== undefined){
			console.log(index);

			self.tabs.splice(index,1);
			self.save();
		}
		if(self.tabs.length == 0){
			self.initTabs();
		}
		if(self.active(tab)){
			if(index-1 == -1){
				if(self.tabs[0]){
					$state.go(self.tabs[0].state,self.tabs[0].params);
				}else{
					$state.go("dashboard.countries");
				}
				
			}else{
				$state.go(self.tabs[index-1].state,self.tabs[index-1].params);
			}
			
		}
		self.save();
	}
	self.save = function(){
		var temp = [];
		for(var i in self.tabs){
			temp.push(self.tabs[i]);
			delete temp[i].$$hashKey;
		}
		localStorage.setItem('tabs',JSON.stringify(temp));
	}
	self.active = function(state){
  		if($state.href(state.state,state.params) == '#' + window.location.href.split('#')[1]){
  			return true;
  		}else{
  			return false;
  		}
  	}
	self.setTabs = function(tabs){
		
	}
	self.getTabs = function(){
		return self.tabs;
	}
	return self;
}])