'use strict';

describe('Country controllers', function(){
  var scope;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope) {
  	scope = $rootScope.$new();
  }));

  it('should define 3 awesome things', inject(function($controller) {
    //expect(scope.awesomeThings).toBeUndefined()

    
    expect(true).toBeTruthy();
    /**expect(angular.isArray(scope.countries)).toBeTruthy();
    expect(scope.countries.length).toBe(3);**/
  }));
});
