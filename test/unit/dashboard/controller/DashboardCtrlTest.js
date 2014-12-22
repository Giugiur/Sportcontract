describe('DashboardCtrl', function() {    
  beforeEach(module('app.dashboard'));

  var $controller, Tabs;

  beforeEach(inject(function($injector){
    $controller = $injector.get("$controller");
    Tabs = $injector.get("Tabs");
  }));

  it('should set the scope', function(){
      //given
      var $scope = {};
      spyOn(Tabs, 'setActive');

      //when
      var controller = $controller('DashboardCtrl', {
        '$scope': $scope,
        'tabs': Tabs
      });

      //then
      expect(Tabs.setActive).toHaveBeenCalled();
      expect($scope.tabs).not.toBe(undefined);
      expect($scope.Tab).toBe(Tabs);
  });
});