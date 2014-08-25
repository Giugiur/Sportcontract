'use strict';

angular.module('app.calendar')
  .directive('calendar', function ($q,Restangular) {
    return {
      restrict: 'A',
        link: function(scope, element, attrs) {

            scope.getLeagues = function(view){
                var defered = $q.defer();
                /*
                 $http.get(api + '/api/leagues').success(function(result){

                 defered.resolve(result);
                 })
                 */
                var d_start = new Date(moment(view.start._d).format());
                var d_end = new Date(moment(view.end._d).format());

                var start = d_start.getFullYear()+"-"+(((d_start.getMonth() + 1) < 10 ) ? "0" + (d_start.getMonth() + 1) : (d_start.getMonth() + 1))+"-"+ ((d_start.getDate() < 10) ? "0" + d_start.getDate() : d_start.getDate());
                var end = d_end.getFullYear()+"-"+(((d_end.getMonth() + 1) < 10 ) ? "0" + (d_end.getMonth() + 1) : (d_end.getMonth() + 1))+"-"+ ((d_end.getDate() < 10) ? "0" + d_end.getDate() : d_end.getDate());

                Restangular.all('api/leaguesCalendar').getList({hasgame:true, game:true, start:start,  end:end}).then(function(result){
                    defered.resolve(result);
                });
                return defered.promise;
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
                      scope.getLeagues(view).then(function(result){
                          scope.leagues = result;
                      });


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
                  if(league && league.active){
                      console.log(league);
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
        }
    };
  });
