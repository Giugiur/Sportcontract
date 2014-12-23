(function(){
	'use strict';

	var Languages = function($http,api){
		var self = this;
		self.languages = [];

		$http.get(api + '/api/getLanguages').success(function(result){
			for(var i in result){
				self.languages.push(result[i]);
			}
		});

		self.getLanguages = function(){
			return self.languages;
		};

		return self;
	};

	var commonModule = angular.module('app.common');
	commonModule.service("Languages", ["$http", "api", Languages]);	
}());