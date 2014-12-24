describe('Scenario: Advanced Search tests - testing filters', function() {    
    it("GIVEN the user is logged in", function(done){
        loginTheUser(done);
    });

    it("AND clicking on advanced search icon the adcanced search section should shown", function(done){
        expandingAdvancedSearch(done);
    });

    describe('THEN testing each filters subFilters', function() {
        var removeFilterHelper = function(callback){
            var removeFilter = element(by.css("#advancedSearchPartial .filterList li a"));
            removeFilter.click().then(function(){
                callback();
            });
        };

        describe("WHEN testing 'nationality' sub-filters", function() {
            //
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.nationality, done);
            });

            it("THEN it should have all countries in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                expect(subFilters.count()).toBe(48+1);
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters, ["USA/Canada"]);

                //todo: use afterAll
                removeFilterHelper(done);
            });

            xit("AND dont forget to remove exclude list from this test suite for 'USA/Canada'!");
        });

        describe("WHEN testing 'passport' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.passport, done);
            });

            it("THEN it should have all countries in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                expect(subFilters.count()).toBe(48+1); //+1 is the default option
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters, ["Mexico", "Hong Kong", "Mongolia", "USA/Canada"]);

                //todo: use afterAll
                removeFilterHelper(done);
            });

            xit("AND dont forget to remove exclude list from this test suite for 'Mexico'!");
            xit("AND dont forget to remove exclude list from this test suite for 'Hong Kong'!");
            xit("AND dont forget to remove exclude list from this test suite for 'Mongolia'!");
            xit("AND dont forget to remove exclude list from this test suite for 'USA/Canada'!");
        });

        describe("WHEN testing 'shoots' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.shoots, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(2+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("left");
                expect(subFilters.get(2).getText()).toBe("right");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'age' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.age, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });


        describe("WHEN testing 'dateOfBirth' sub-filters", function() {
            xit("GIVEN the filter already applied",function(done){});
            xit("THEN it should have all options in the subfilters list", function(){});
            xit("AND it should have hits when changing subfilters", function(){});
        });

        describe("WHEN testing 'position' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.position, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(6+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("goalie");
                expect(subFilters.get(2).getText()).toBe("defenseman");
                expect(subFilters.get(3).getText()).toBe("forward");
                expect(subFilters.get(4).getText()).toBe("centre");
                expect(subFilters.get(5).getText()).toBe("left wing");
                expect(subFilters.get(6).getText()).toBe("right wing");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'league' sub-filters", function() {
            xit("GIVEN the filter already applied",function(){});
            xit("THEN it should have all options in the subfilters list", function(){});
            xit("AND it should have hits when changing subfilters", function(){});
        });

        describe("WHEN testing 'team' sub-filters", function() {
            xit("GIVEN the filter already applied",function(){});
            xit("THEN it should have all options in the subfilters list", function(){});
            xit("AND it should have hits when changing subfilters", function(){});
        });

        describe("WHEN testing 'goals' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.goals, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'assists' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.assists, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'TP' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.TP, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'GP' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.GP, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'GAA' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.GAA, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'SVP' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.SVP, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters, ["between", ">"]);

                //todo: use afterAll
                removeFilterHelper(done);
            });

            xit("AND dont forget to remove exclude list from this test suite for 'between'!");
            xit("AND dont forget to remove exclude list from this test suite for '>'!");
        });

        describe("WHEN testing 'PIM' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.PIM, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });

        describe("WHEN testing 'PM' sub-filters", function() {
            //todo: once karma-jasmine updated, we can use it
            //afterAll(function(done){
            //    removeFilterHelper(done);
            //});

            it("GIVEN the filter already applied",function(done){
                applyFilter(filterIndexes.PM, done);
            });

            it("THEN it should have all options in the subfilters list", function(){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));

                expect(subFilters.count()).toBe(5+1); //+1 is the default option
                expect(subFilters.get(1).getText()).toBe("between");
                expect(subFilters.get(2).getText()).toBe(">");
                expect(subFilters.get(3).getText()).toBe(">=");
                expect(subFilters.get(4).getText()).toBe("<");
                expect(subFilters.get(5).getText()).toBe("<=");
            });

            it("AND it should have hits when changing subfilters", function(done){
                var subFilters = element.all(by.css("#advancedSearchPartial .filterList li option"));
                applySubFilters(subFilters);

                //todo: use afterAll
                removeFilterHelper(done);
            });
        });
    });

    var filterIndexes = {
        nationality : 1,
        passport: 2,
        shoots: 3,
        age: 4,
        dateOfBirth: 5,
        position: 6,
        league: 7,
        team: 8,
        goals: 9,
        assists: 10,
        TP: 11,
        GP: 12,
        GAA: 13,
        SVP: 14,
        PIM: 15,
        PM: 16
    };

    var applyFilter = function(filterIndex, callback){
        var clickingOnAddFilterButton = function(){
            var filterBtn = element(by.css("#advancedSearchPartial .filter button"));
            filterBtn.click().then(callback);
        };

        var allOptions = element.all(by.css("#advancedSearchPartial .filterAdd option"));
        allOptions.get(filterIndex).click().then(clickingOnAddFilterButton);
    };

    var applySubFilters = function(subFilters, excludedSubFilters){
        subFilters.each(function(subFilter){
            subFilter.getAttribute("value").then(function(optionValue){
                if(typeof optionValue !== "undefined" && optionValue.length){
                    clickOnSubFilterIfNotExcluded(subFilter, optionValue, excludedSubFilters);
                }
            });
        });
    };

    var clickOnSubFilterIfNotExcluded = function(subFilter, optionValue, excludedSubFilters){
        subFilter.getText().then(function(text){

            if(typeof excludedSubFilters === "undefined" || excludedSubFilters.indexOf(text) === -1){
                subFilter.click().then(function(){
                    checkResult(true);
                });
            }

        });        
    };

    var checkResult = function(onlyOneRow){
        onlyOneRow = onlyOneRow || false;

        var resultsRows = element.all(by.css("#advancedSearchPartial .result table tr.resultHits"));
        expect(resultsRows.count()).toBeGreaterThan(0);

        if(onlyOneRow){
            var resultRow = resultsRows.first();
            checkRow(resultRow);
        }else{
            resultsRows.each(function(resultRow){
                checkRow(resultRow);
            });
        }
    };

    var checkRow = function(resultRow){
        var resultColFlag = resultRow.element(by.css(".resultColFlag img"));
        var resultColPlayerName = resultRow.element(by.css(".resultColPlayerName a"));
        var resultColPosition = resultRow.element(by.className("resultColPosition"));
        var resultColDateOfBirth = resultRow.element(by.className("resultColDateOfBirth"));
        var resultColLeague = resultRow.element(by.className("resultColLeague"));

        expect(resultColFlag.isDisplayed()).toBeTruthy();

        expect(resultColPlayerName.isDisplayed()).toBeTruthy();
        resultColPlayerName.getText().then(function(text){
            expect(text.length).toBeGreaterThan(0);
        });

        expect(resultColPosition.isDisplayed()).toBeTruthy();
        resultColPosition.getText().then(function(text){
            expect(text.length).toBeGreaterThan(0);
        });

        /*Do not delete these checks! Fix the bug and uncomment these rows.
            expect(resultColDateOfBirth.isDisplayed()).toBeTruthy();
            resultColDateOfBirth.getText().then(function(text){
                expect(text.length).toBeGreaterThan(0);
            });

            expect(resultColLeague.isDisplayed()).toBeTruthy();
            resultColLeague.getText().then(function(text){
                expect(text.length).toBeGreaterThan(0);
            });
        */
    };

    var expandingAdvancedSearch = function(done){
        var searchPlus = element(by.id("fa-plus-link"));
        searchPlus.click().then(function(){
            var advancedSearch = element(by.id("advancedSearchPartial"));
            expect(advancedSearch.isDisplayed()).toBeTruthy();

            done();
        });
    };

    var loginTheUser = function(done){
        browser.get('#/login');

        var loginButton = element(by.className('btn'));
        var username = element(by.model('username'));
        var password = element(by.model('password'));

        username.sendKeys("q");
        password.sendKeys("q");

        loginButton.click().then(function(){
            done();
        });
    };
});
