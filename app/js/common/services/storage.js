angular.module('app.common').value('api','http://nodedevel.sportcontract.eu')
angular.module('app.common').run(['Restangular','api',function(Restangular,api){
	Restangular.setBaseUrl(api)
}])
angular.module('app.common').service('Storage',['$q','Restangular',function($q,Restangular){
	var self = this;
	function Storage (name,offline,options){
		this.name = name;
		this.offline = offline;
		this.actionQueu = [];
		if(localStorage.getItem(this.name) && localStorage.getItem(this.name) !== "undefined"){
			this.db = JSON.parse(localStorage.getItem(this.name));
		}else{
			this.db = {
				lastUpdated : 0
			}
			localStorage.setItem(this.name,JSON.stringify(this.db))
		}
		this.updateTime = options.updateTime?options.updateTime:10000000;
	}
	Storage.prototype.update = function(){
		return Restangular.all(this.name).getList();
	}
	Storage.prototype._needUpdate = function(){
		var deferred = $q.defer();
		var _this = this;
		if(((new Date().getTime() - this.db.lastUpdated)>this.updateTime) || !this.offline){
			this.update().then(function(result){
				_this.db.data = result;
				_this.db.lastUpdated = new Date().getTime();
				localStorage.setItem(_this.name,JSON.stringify(_this.db))
				deferred.resolve(false);
			})
		}else{
			deferred.resolve(false);
		}
		return deferred.promise;
	}
	Storage.prototype.all = function(){
		var deferred = $q.defer();
		var _this = this;
		this._needUpdate().then(function(){
			deferred.resolve(_this.db.data);
		})
		return deferred.promise;
	}
	Storage.prototype.find = function(query){
		var deferred = $q.defer();
		var _this = this;
		this._needUpdate().then(function(){
			deferred.resolve(_.filter(_this.db.data,query));
		})
		return deferred.promise;
	}


	self.init = function(name,offline,options){
		return new Storage(name,offline,options);
	}
	return self;
}])

