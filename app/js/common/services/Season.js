



angular.module('app.common').service('Season',[function(){
    var self = this;
    self.season;
    self.setSeason = function(season){
        self.season = season;
    }
    self.getSeason = function(){
        return self.season?self.season:2013;
    }

    return self;
}])