



angular.module('app.common').service('User',['$http','api','$q',function($http,api,$q){
	var self = this;
	self.user;
	self.setUser = function(user){
		self.user = user;
	}
	self.getUser = function(){
		return self.user;
	}
	self.$save = function(){
		var deferred = $q.defer();
		$http.put(api + "/api/users/" + self.user._id,self.user).success(function(result){
			deferred.resolve(result);
		})
		return deferred.promise;
	}
	return self;
}])