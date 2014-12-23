(function(){
    'use strict';

    var DashboardCtrl = function($scope,Tabs,$state,$rootScope) {
        $scope.tabs = Tabs.getTabs();
        $scope.Tab = Tabs;

        Tabs.setActive();
    };

    var dashboardModule = angular.module('app.dashboard');
    dashboardModule.controller("DashboardCtrl", ["$scope", "Tabs", "$state", "$rootScope", DashboardCtrl]);
}());