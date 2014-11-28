angular.module('app.common').service('Season', ['$rootScope',function($rootScope){

  var self = this;

  self.config = {
    month_start: 9,
    day_start: 1,
    month_end: 8,
    day_end: 31
  }

  self.season = {
    start : "",
    end : "",
    season : 2013,
    config : self.config
  }

  self.currentMonth = Number(moment().format('MM'));
  self.currentYear = Number(moment().format('YYYY'));

  self.initSeason = function(season){
    if(angular.isUndefined(season)){
      if (self.currentMonth >= self.config.month_start) {
        self.season.start = self.currentYear + "-" + (((self.config.month_start) < 10 ) ? "0" + (self.config.month_start) : (self.config.month_start)) + "-" + ((self.config.day_start < 10) ? "0" + self.config.day_start : self.config.day_start);
        self.season.end = (self.currentYear + 1) + "-" + (((self.config.month_end) < 10 ) ? "0" + (self.config.month_end) : (self.config.month_end)) + "-" + ((self.config.day_end < 10) ? "0" + self.config.day_end : self.config.day_end);
        self.setSeason(self.currentYear);
      } else {
        self.season.start = (self.currentYear - 1) + "-" + (((self.config.month_start) < 10 ) ? "0" + (self.config.month_start) : (self.config.month_start)) + "-" + ((self.config.day_start < 10) ? "0" + self.config.day_start : self.config.day_start);
        self.season.end = self.currentYear + "-" + (((self.config.month_end) < 10 ) ? "0" + (self.config.month_end) : (self.config.month_end)) + "-" + ((self.config.day_end < 10) ? "0" + self.config.day_end : self.config.day_end);
        self.setSeason(self.currentYear - 1);
      }
    }else{
      self.setSeason(season);
    }
  }

  self.updateSeasonData = function(season){
    if(Number(season) != self.season.season){
      self.season.start = Number(season)+"-"+(((self.config.month_start) < 10 ) ? "0" + (self.config.month_start) : (self.config.month_start))+"-"+ ((self.config.day_start < 10) ? "0" + self.config.day_start : self.config.day_start);
      self.season.end = (Number(season)+1)+"-"+(((self.config.month_end) < 10 ) ? "0" + (self.config.month_end) : (self.config.month_end))+"-"+ ((self.config.day_end < 10) ? "0" + self.config.day_end : self.config.day_end);
      self.setSeason(season);
    }
  }

  self.getSeasonData = function(){
    return self.season;
  }

  self.setSeason = function(year){
    self.season.season = year;
    $rootScope.currentSeason = year;
  }

  self.getSeason = function(){
    return self.season.season;
  }
/*
  if($rootScope.currentSeason != self.currentYear) {
    self.updateSeasonData($rootScope.currentSeason);
  }else {
    self.setCurrentSeason();
  }
*/
}]);
