describe("Testing Languages", function() {
  var $httpBackend, api;

  beforeEach(module("app.common"));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    api = $injector.get("api");

    $httpBackend.when('GET', api +'/api/getLanguages').respond(201, [
        'nl',
        'en',
        'fr'
    ]);
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get 3 languages', inject(function(Languages){
      //given
      $httpBackend.flush();

      //when
      var languages = Languages.getLanguages();

      //then
      expect(languages.length).toEqual(3);
  }));
});