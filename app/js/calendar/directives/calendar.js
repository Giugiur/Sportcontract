'use strict';

angular.module('app.calendar')
  .directive('calendar', function ($q,Restangular,Season,$rootScope,$timeout,User) {
    return {
      restrict: 'A',
        link: function(scope, element, attrs) {

          var currentSeason = Season;

          scope.user = User.getUser();

          //currentSeason.initSeason($rootScope.currentSeason);

          scope.checkSeason = function(view){

            /*Season dates*/
            scope.seasonData = scope.getSeasonData();
            scope.season = scope.getSeason();

            /*current calendar view*/
            var d_start = new Date(moment(view.intervalStart._d).format());
            var view_year = d_start.getFullYear();
            var view_month = d_start.getMonth()+1;

            var year = false;

            if(view_year == scope.season){
              if(Number(view_month) < scope.seasonData.config.month_start){
                //prev season
                year = view_year-1;
              }else{
                year = view_year;
              }
            }else if(view_year > scope.season){
                if(Number(view_month) > scope.seasonData.config.month_end){
                  //next season
                  year = view_year;
                }
            }else if(view_year < scope.season){
              if(Number(view_month) < scope.seasonData.config.month_start){
                //prev season
                year = view_year-1;
              }else{
                //next season
                year = view_year;
              }
            }

            if(year !== false){
              $timeout(function(){
                scope.updateSeasonData(year);
                scope.season = scope.getSeason();
                scope.$apply();
              }, 0);


            }

          };

          scope.updateSeasonData = function(season){
            currentSeason.updateSeasonData(season);
            scope.seasonData = currentSeason.getSeasonData();

          }

          scope.getSeason = function(){
            return currentSeason.getSeason();
          }

          scope.getSeasonData = function(){
            return currentSeason.getSeasonData();
          }

          scope.$watch('season', function(newval){

            scope.updateSeasonData(newval);

            scope.getLeagues(scope.seasonData).then(function(result){
              scope.leagues = result;
            });
          }, true);

          scope.getLeagues = function(seasonData){
            //console.log(seasonData);
            var defered = $q.defer();

            var start = seasonData.start;
            var end = seasonData.end;

            Restangular.all('api/leaguesCalendar').getList({hasgame:true, game:true, start:start,  end:end}).then(function(result){
              defered.resolve(_.sortBy(result,function(item){return item.level;}));
            });
            return defered.promise;

          }

          scope.checkLeagueInUserCalendars = function(leagueId){

            var index = -1;
            var i = 0;
            angular.forEach(scope.user.calendars.leagueCalendars, function(cal){
              if(cal.league == leagueId)
                index = i;
              i++;
            });

            return index;
          }

          scope.toggleLeague = function(leagueId){

            var index = scope.checkLeagueInUserCalendars(leagueId);

              if(index > -1){
                scope.user.calendars.leagueCalendars.splice(index,1);
              }
              else{
                scope.user.calendars.leagueCalendars.push({league:leagueId, active:true});
              }
            User.$save();
            scope.update();
          }

          scope.isActiveLeague = function(leagueId){

            var tmp = false;

            angular.forEach(scope.user.calendars.leagueCalendars, function(cal) {

              if (cal.league == leagueId) {
                tmp = cal.active;
              }

            });

            return tmp;

          }

          scope.toggleLeagueActive = function(leagueId){
            angular.forEach(scope.user.calendars.leagueCalendars, function(cal){
              if(cal.league == leagueId){
                cal.active = !cal.active;
              }
            });

            User.$save();
            scope.update();
          }

          scope.switchSeason = function(val){
            var view = $(element).fullCalendar('getView');
            var d_start = new Date(moment(view.intervalStart._d).format());
            var view_month = d_start.getMonth()+1;

            scope.updateSeasonData(val);

            if(view_month < scope.seasonData.config.month_start)
              val = Number(val)+1;

            $(element).fullCalendar('gotoDate',val+"-"+(Number(view_month)<10 ? "0"+view_month : view_month)+"-01");
          }



            $(element).fullCalendar({
                  defaultView: 'month',
                  header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                  },
                  editable: false,
                  events: [],
                  viewRender: function (view, element) {
                      //scope.getLeagues(view).then(function(result){
                      //    scope.leagues = result;
                      //});
                    scope.checkSeason(view);


                  }
            });

            scope.$watch('leagues',function(){
              scope.update();
            },true);

            scope.getEnding = function(game){
              if(game){
                if(game.ending == "shootout"){
                  return "SO"
                }
                if(game.ending == "overtime"){
                  return "OT"
                }
              }

              return "";
            }
            scope.update = function(){
              $(element).fullCalendar( 'removeEvents', function(event) {
                      return true;
              });
              var out = [];

              if(scope.leagues){

                for(var i in scope.leagues){
                  var league = scope.leagues[i];
                  if(league && scope.isActiveLeague(league._id)){

                    for(var o in league.games){

                      var temp = league.games[o];
                      var str = "";

                      if(temp.score_home){
                        str = " " + temp.score_home + ":" + temp.score_away + " " + scope.getEnding(temp);
                      }
                        if(!angular.isUndefined(scope.mapped_teams[temp.home]) && !angular.isUndefined(scope.mapped_teams[temp.away])) {
                            var event = {
                                title: scope.mapped_teams[temp.home].name + " vs " + scope.mapped_teams[temp.away].name + str,
                                start: new Date(temp.date),
                                backgroundColor: league.color,
                                allDay: false
                            }
                            out.push(event);
                        }
                    }
                  }
                }

              }
              $(element).fullCalendar('addEventSource',out);
            }

          scope.seasonData = scope.getSeasonData();
          scope.season = scope.getSeason();

          scope.selection = {};
          //toggle CalendarCollection
          scope.showCal = false;

          var date = new Date(moment().format());
          var month = date.getMonth()+1;
          var day = date.getDate();

          $(element).fullCalendar('gotoDate',scope.season+"-"+(Number(month)<10 ? "0"+month : month)+"-"+(Number(day)<10 ? "0"+day : day))
        }
    };
  });
