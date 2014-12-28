describe("Testing User service", function(){
    var $httpBackend, api, User, Season;

    beforeEach(module("app.common"));

    beforeEach(inject(function($injector) {
        api = $injector.get("api");
        $httpBackend = $injector.get('$httpBackend');
        Season = $injector.get("Season");
        User = $injector.get("User");
    }));
  
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should contain the 'User' service", function(){
        expect(User).not.toEqual(null);
    });

    it("should have all functions", function() {
        expect(User.setUser).not.toEqual(null);
        expect(User.getUser).not.toEqual(null);
        expect(User.setSeason).not.toEqual(null);
        expect(User.$save).not.toEqual(null);
        expect(User.user).not.toBeDefined();
    });

    it("WHEN calling 'setUser' and 'getUser' THEN it should set and get the user", function(){
        //given
        var userObject = {
            _id: "52aef62e47132ad33200001e",
            email: "somebody@emailaddress.com"
        };

        //when
        User.setUser(userObject);

        //then
        expect(User.getUser()).toEqual(userObject);
    });

    it("WHEN calling 'setUser' AND param is not provided THEN it should throw an error", function(){
        expect(function(){
            User.setUser()
        }).toThrow("You must pass 'user' to function setUser");
    });

    describe("WHEN calling 'setSeason'",function(){
        var userObject, seasonObject;
        beforeEach(function(){
            //given
            spyOn(User, "$save");
            spyOn(Season, "setSeason");

            userObject = {
                _id: "52aef62e47132ad33200001e",
                email: "somebody@emailaddress.com"
            };

            seasonObject = {
                id: "2342564vfsdgfd",
                name: "2013-2014"
            };

            User.setUser(userObject);

            $httpBackend.when('PUT', api +'/api/users/' + userObject._id, userObject).respond(201, {
              "response": "success"
            });
        });

        it("THEN it should set the season to the user object", function(){
            //when
            User.setSeason(seasonObject);

            //then
            $httpBackend.flush();
            var userObject = User.getUser();

            expect(userObject.hasOwnProperty("season")).toBe(true);
            expect(userObject.season).toBe(seasonObject);
        });

        it("THEN it should call 'Season.setSeason' with the right params", function(){
            //when
            User.setSeason(seasonObject);

            //then
            $httpBackend.flush();
            expect(Season.setSeason).toHaveBeenCalledWith(seasonObject);
        });

        it("WHEN calling 'setSeason' AND param is not provided THEN it should throw an error", function(){
            expect(function(){
                User.setSeason()
                //should not have outstanding http request that needs to be flush
            }).toThrow("You must pass 'season' to function setSeason");
        });
    });

    describe("WHEN calling '$save'",function(){
        var userObject;
        beforeEach(function(){
            //given
            userObject = {
                _id: "52aef62e47132ad33200001e",
                email: "somebody@emailaddress.com"
            };

            User.setUser(userObject);

            $httpBackend.when('PUT', api +'/api/users/' + userObject._id, userObject).respond(201, {
              "response": "success"
            });
        });

        it("WHEN calling '$save' THEN it should call the proper url to save", function(){
            User.$save();
            $httpBackend.flush();
        });

        it("WHEN calling '$save' THEN it should return the promise",function(){
            //when
            var response = User.$save();
            $httpBackend.flush();

            //then
            expect(response.then instanceof Function).toBe(true);
        });
    });

    it("WHEN calling '$save' AND if user is not exists yet THEN it should throw an error", function(){
       expect(function(){
            User.$save()
        }).toThrow("Can't save user object because it not exists yet!"); 
    });
});