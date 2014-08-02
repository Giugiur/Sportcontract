
describe("Testing Languages", function() {
	 var $httpBackend, api, getLanguages;
  beforeEach(inject(function($injector) {
         // Set up the mock http service responses
         $httpBackend = $injector.get('$httpBackend');
         api = $injector.get('api');
         // backend definition common for all tests
         $httpBackend.when('GET', api + '/api/getLanguages').respond(
         	[
         		'nl',
         		'en',
         		'fr'
         	]
         	);
         getLanguages = function(){
         	return $injector('Languages');
         }
         
       }));
  afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
       });

  

  it('Should get 3 languages',
    inject(function() {
    	$httpBackend.expectGET(api + '/api/getLanguages');
    	var languages = getLanguages();
    	expect(languages.getLanguages().length).to.equal(3);
   
  }));

  
  

});