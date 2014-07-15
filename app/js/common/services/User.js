angular.module('app.common').service('User',[function(){
	var self = this;
	self.user;
	self.setUser = function(user){
		self.user = user;
	}
	self.getUser = function(){
		return self.user;
	}

	return self;
}])