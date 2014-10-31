angular.module('app.common').service('Languages',['$http','api',function($http,api){
	var self = this;
	self.languages = [];

	$http.get(api + '/api/getLanguages').success(function(result){
		for(var i in result){
			self.languages.push(result[i]);
		}
	})
	self.getLanguages = function(){
		return self.languages;
	}

	return self;
}])