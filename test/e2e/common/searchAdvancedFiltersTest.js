describe('Scenario: Advanced Search tests - testing filters', function() {    
    it("GIVEN the user is logged in", function(done){
        loginTheUser(done);
    });

    it("AND clicking on advanced search icon the adcanced search section should shown", function(done){
        expandingAdvancedSearch(done);
    });

    describe('THEN testing each filters', function() {
        afterEach(function(done){
            var removeFilter = element(by.css("#advancedSearchPartial .filterList li a"));
            removeFilter.click().then(function(){
                done();
            });
        });

        it("AND when it's expanded it should have hits when applying 'nationality' filter", function(){
            applyFilter(filterIndexes.nationality, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'passport' filter", function(){
            applyFilter(filterIndexes.passport, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'shoots' filter", function(){
            applyFilter(filterIndexes.shoots, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'age' filter", function(){
            applyFilter(filterIndexes.age, checkResult);
        });

        xit("AND when it's expanded it should have hits when applying 'dateOfBirth' filter", function(){
            applyFilter(filterIndexes.dateOfBirth, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'position' filter", function(){
            applyFilter(filterIndexes.position, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'league' filter", function(){
            applyFilter(filterIndexes.league, checkResult);
        });

        xit("AND when it's expanded it should have hits when applying 'team' filter", function(){
            applyFilter(filterIndexes.team, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'goals' filter", function(){
            applyFilter(filterIndexes.goals, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'assists' filter", function(){
            applyFilter(filterIndexes.assists, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'TP' filter", function(){
            applyFilter(filterIndexes.TP, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'GP' filter", function(){
            applyFilter(filterIndexes.GP, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'GAA' filter", function(){
            applyFilter(filterIndexes.GAA, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'SVP' filter", function(){
            applyFilter(filterIndexes.SVP, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'PIM' filter", function(){
            applyFilter(filterIndexes.PIM, checkResult);
        });

        it("AND when it's expanded it should have hits when applying 'PM' filter", function(){
            applyFilter(filterIndexes.PM, checkResult);
        });

        xit("AND dont forget to fix the bug about the advanced search missing fields - and uncomment checks in there after it!", function(){});
    });

    describe('WHEN testing clickability', function(){
        it("GIVEN 'nationality' filter applied", function(){
            applyFilter(filterIndexes.nationality, checkResult);
        });

        it("THEN clicking on a player should open a new tab on the page", function(){
            var resultsRows = element.all(by.css("#advancedSearchPartial .result table tr.resultHits"));
            var resultRow = resultsRows.first();
            var resultColPlayerName = resultRow.element(by.css(".resultColPlayerName a"));

            resultColPlayerName.click().then(function(){
                var tabs = element.all(by.css(".dashboardModule ul.etabs li"));
                var activeTab = element(by.css(".dashboardModule ul.etabs li.active"));
                var tabName = activeTab.element(by.css("a.title"));

                expect(tabs.count()).toBe(2);
                expect(activeTab.isDisplayed()).toBeTruthy();

                tabs.first().getText().then(function(text){
                    expect(text).toBe("Home");
                });
                
                tabName.getText().then(function(text){
                    expect(text.length).toBeGreaterThan(0);
                    expect(text).not.toBe("Home");
                });
            });
        })
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
    

    var checkResult = function(){
        var resultsRows = element.all(by.css("#advancedSearchPartial .result table tr.resultHits"));
        expect(resultsRows.count()).toBeGreaterThan(0);

        var resultRow = resultsRows.first();
        checkRow(resultRow);
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