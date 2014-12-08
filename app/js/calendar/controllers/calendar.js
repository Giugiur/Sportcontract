var CalendarCtrl = function($scope,$http, Storage, $state, Tabs, ngProgress, teams) {

    ngProgress.complete();


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

    //this only works as long as there are no tabs set within calendar module
    $scope.goBack = function(){
      Tabs.goTo(Tabs.activeTab.state,Tabs.activeTab.params,Tabs.activeTab.name);
    }

  };
