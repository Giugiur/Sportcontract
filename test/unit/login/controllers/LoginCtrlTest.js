describe('LoginCtrl', function() {    
  beforeEach(module('app.login'));

  var $controller, $httpBackend, authRequestHandler, User, Tabs;
  var mockedUserObject = {
    object: {"mockedUserObject": "fakedata"}
  };
  var usernameParam = "username";
  var passwordParam = "password";

  beforeEach(inject(function($injector){
    $controller = $injector.get("$controller");
    $httpBackend = $injector.get("$httpBackend");
    User = $injector.get("User");
    Tabs = $injector.get("Tabs");

    authRequestHandler = $httpBackend.expect("POST", '/api/users/login', {
      username: usernameParam, 
      password: passwordParam
    });

  }));

  describe('login with right credentials', function(){
    it('should set the User and the active tab', function(){
        //given
        var $scope = {};
        var controller = $controller('LoginCtrl', {
          '$scope': $scope,
          'api': ''
        });
        spyOn(User, 'setUser');
        spyOn(Tabs, 'setActive');
        authRequestHandler.respond(201, mockedUserObject);

        //when
        $scope.login(usernameParam, passwordParam);
        $httpBackend.flush();

        //then
        expect(Tabs.setActive).toHaveBeenCalled();
        expect(User.setUser).toHaveBeenCalledWith(mockedUserObject.object);
    });
  });

  describe('login with wrong credentials', function(){
    it('should not set the User and the active tab', function(){
        //given
        var $scope = {};
        var controller = $controller('LoginCtrl', {
          '$scope': $scope,
          'api': ''
        });
        spyOn(User, 'setUser');
        spyOn(Tabs, 'setActive');
        authRequestHandler.respond(401);

        //when
        $scope.login(usernameParam, passwordParam);
        $httpBackend.flush();

        //then
        expect(Tabs.setActive).not.toHaveBeenCalled();
        expect(User.setUser).not.toHaveBeenCalled();
    });
  });
});