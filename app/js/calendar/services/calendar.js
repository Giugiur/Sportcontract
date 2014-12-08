'use strict';

angular.module('app.calendar').
  service('Calendar','$http','api','$q', function($http,api,$q){
    var self = this;

    self.calendar;

    self.getCalendar = function(){
      return self.calendar;
    }

    self.setCalendar = function(calendar){
      self.calendar = calendar;
    }

    self.$save = function(){
      var deferred = $q.defer();
      $http.put(api + "/api/new/calendars/" + self.calendar._id,self.calendar).success(function(result){
        deferred.resolve(result);
      })
      return deferred.promise;
    }

    return self;
  });
