describe("Testing Languages", function() {
  var $httpBackend, api, Languages;

  beforeEach(module("app.common"));

  beforeEach(inject(function($injector) {
    api = $injector.get("api");

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', api +'/api/getLanguages').respond(201, ["de_German","en_English","nl_Dutch","ru_Russian"]);   

    Languages = $injector.get("Languages");
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get 4 languages', function(){
      //given
      $httpBackend.flush();

      //when
      var languages = Languages.getLanguages();

      //then
      expect(languages.length).toEqual(4);
  });
});