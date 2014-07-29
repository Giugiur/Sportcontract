var CalendarCtrl = function($scope,$http, Storage, $state, Tabs,ngProgress,leagues,teams) {
    ngProgress.complete();


    $scope.leagues = leagues;
    $scope.teams = teams;
    $scope.mapped_teams = {};

    $scope.$watch('teams',function(newTeams){
        if(!newTeams){
            return;
        }
        newTeams.forEach(function(team){
            $scope.mapped_teams[team._id]  = team;
        })
    },true)

  };
