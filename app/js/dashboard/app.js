(function(){
    var dashboardModuleConfig = function($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('dashboard', {
              url: "/dashboard",
              views:{
                "main": {
                    controller : "DashboardCtrl",
                    templateUrl: "dashboard/views/dashboard.html"
                },
                "sidebar@dashboard": {
                    templateUrl: "common/views/sidebar.html"
                },
                "header@dashboard": {
                    templateUrl : "common/views/header.html",
                    controller : HeaderCtrl
                },
                "tabcontent@dashboard": {
                    templateUrl: "countries/views/countries.html",
                    controllers : CountriesCtrl
                }
              },
              resolve:{
                  specificTranslations: function($translatePartialLoader, $translate, User) {

                      var user = User.getUser();
                      $translate.use(user.profile.language);

                      $translatePartialLoader.addPart('dashboard');
                      $translatePartialLoader.addPart('header');
                      $translatePartialLoader.addPart('sidebar');
                      $translatePartialLoader.addPart('countries');

                      // add other needed parts
                      return $translate.refresh();
                  }
              }
            });
    };

    var dashboardModule = angular.module('app.dashboard', ['ui.router','pascalprecht.translate','app.common','app.search']);
    dashboardModule.config(['$stateProvider', '$translatePartialLoaderProvider', dashboardModuleConfig]);
}());