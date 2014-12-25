describe("QuickSearch", function() {    
    beforeEach(module('app.quicksearch'));

    var $compile,
        $rootScope,
        $httpBackend,
        element,
        scope,
        api,
        teamsRequestHandler,
        leaguesRequestHandler,
        playersRequestHandler,
        countriesRequestHandler,
        staffsRequestHandler;

    beforeEach(inject(function($injector){
        $compile = $injector.get("$compile");
        $rootScope = $injector.get("$rootScope");
        $httpBackend = $injector.get("$httpBackend");
        api = $injector.get("api");

        scope = $rootScope.$new();
        scope.search = {
          searchterm : ""
        };

        element = '<quicksearch search="search"></quicksearch>';
        element = $compile(element)(scope);
        scope.$digest();

        jasmine.getJSONFixtures().fixturesPath='base/test/mock';
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("WHEN no action happened THEN every group should be empty", function(){
        var sc = element.isolateScope();

        expect(sc.players).toEqual([]);
        expect(sc.teams).toEqual([]);
        expect(sc.countries).toEqual([]);
        expect(sc.leagues).toEqual([]);
        expect(sc.staffs).toEqual([]);
    });

    it("WHEN searching THEN it should set the group scopes with hits", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(201, getJSONFixture('api_search_teams.json'));
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_leagues.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_players.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_countries.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_staffs.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.teams.length > 0){ 
                expect(sc.players).not.toEqual([]);
                expect(sc.players.length).toBeGreaterThan(0);

                expect(sc.teams).not.toEqual([]);
                expect(sc.teams.length).toBeGreaterThan(0);

                expect(sc.countries).not.toEqual([]);
                expect(element.isolateScope().countries.length).toBeGreaterThan(0);

                expect(sc.leagues).not.toEqual([]);
                expect(sc.leagues.length).toBeGreaterThan(0);

                expect(sc.staffs).not.toEqual([]);
                expect(sc.staffs.length).toBeGreaterThan(0);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });

    it("WHEN searching AND only 'teams' request does not have any hits THEN it should set the 'team group' too", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_leagues.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_players.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_countries.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_staffs.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.players.length > 0){
                expect(sc.players).not.toEqual([]);
                expect(sc.players.length).toBeGreaterThan(0);

                expect(sc.teams).not.toEqual([]);
                expect(sc.teams.length).toBeGreaterThan(0);

                expect(sc.countries).not.toEqual([]);
                expect(sc.countries.length).toBeGreaterThan(0);

                expect(sc.leagues).not.toEqual([]);
                expect(sc.leagues.length).toBeGreaterThan(0);

                expect(sc.staffs).not.toEqual([]);
                expect(sc.staffs.length).toBeGreaterThan(0);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });
  
    it("WHEN searching AND only 'teams' request has hits THEN 'team group' and 'leagues group' and 'countries group' should not be empty", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(201, getJSONFixture('api_search_teams.json'));
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.teams.length > 0){
                expect(sc.teams).not.toEqual([]);
                expect(sc.teams.length).toBeGreaterThan(0);

                expect(sc.leagues).not.toEqual([]);
                expect(sc.leagues.length).toBeGreaterThan(0);

                expect(sc.countries).not.toEqual([]);
                expect(sc.countries.length).toBeGreaterThan(0);

                expect(sc.players).toEqual([]);
                expect(sc.staffs).toEqual([]);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });

    it("WHEN searching AND only 'leagues' request has hits THEN 'leagues group' and 'countries group' should not be empty", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_leagues.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.leagues.length > 0){
                expect(sc.leagues).not.toEqual([]);
                expect(sc.leagues.length).toBeGreaterThan(0);

                expect(sc.countries).not.toEqual([]);
                expect(sc.countries.length).toBeGreaterThan(0);

                expect(sc.teams).toEqual([]);
                expect(sc.players).toEqual([]);
                expect(sc.staffs).toEqual([]);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });

    it("WHEN searching AND only 'countries' request has hits THEN 'countries group' should not be empty", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_countries.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_empty_response.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.countries.length > 0){
                expect(sc.countries).not.toEqual([]);
                expect(sc.countries.length).toBeGreaterThan(0);

                expect(sc.leagues).toEqual([]);
                expect(sc.teams).toEqual([]);
                expect(sc.players).toEqual([]);
                expect(sc.staffs).toEqual([]);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });

    it("WHEN searching AND 'team' request gives back 404 THEN 'team group' should be empty and other groups should be set", function(done){
        scope.search = {
            searchterm : "ger"
        };

        mockSuccessRequests();

        teamsRequestHandler.respond(404, "not found");
        leaguesRequestHandler.respond(201, getJSONFixture('api_search_leagues.json'));
        playersRequestHandler.respond(201, getJSONFixture('api_search_players.json'));
        countriesRequestHandler.respond(201, getJSONFixture('api_search_countries.json'));
        staffsRequestHandler.respond(201, getJSONFixture('api_search_staffs.json'));

        scope.$digest();

        setTimeout(function(){
            $httpBackend.flush();
        }, 100);

        var scopeDoneInterval = setInterval(function(){
            var sc = element.isolateScope();
            if(sc.countries.length > 0){
                expect(sc.teams).toEqual([]);

                expect(sc.leagues).not.toEqual([]);
                expect(sc.leagues.length).toBeGreaterThan(0);

                expect(sc.countries).not.toEqual([]);
                expect(sc.countries.length).toBeGreaterThan(0);

                expect(sc.players).not.toEqual([]);
                expect(sc.players.length).toBeGreaterThan(0);

                expect(sc.staffs).not.toEqual([]);
                expect(sc.staffs.length).toBeGreaterThan(0);

                clearInterval(scopeDoneInterval);
                done();
            }
        },100);
    });

    var mockSuccessRequests = function(){
        teamsRequestHandler = $httpBackend.expect("GET", api + '/api/search/teams/' + scope.search.searchterm);
        leaguesRequestHandler = $httpBackend.expect("GET", api + '/api/search/leagues/' + scope.search.searchterm);
        playersRequestHandler = $httpBackend.expect("GET", api + '/api/search/players/' + scope.search.searchterm);
        countriesRequestHandler = $httpBackend.expect("GET", api + '/api/search/countries/' + scope.search.searchterm);
        staffsRequestHandler = $httpBackend.expect("GET", api + '/api/search/staffs/' + scope.search.searchterm);
    };
});