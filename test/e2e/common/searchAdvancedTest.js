describe('Scenario: Advanced Search tests', function() {

    it("WHEN the user is logged in", function(done){
        loginTheUser(done);
    });

    it("AND clicking on advanced search icon the adcanced search section should shown", function(done){
        expandingAdvancedSearch(done);
    });

    it("AND when clicking on advanced search icon when it's expanded THEN it should shown hidden", function(done){
        var searchPlus = element(by.id("fa-plus-link"));
        searchPlus.click().then(function(){
            var advancedSearch = element(by.id("advancedSearchPartial"));
            expect(advancedSearch.isDisplayed()).not.toBeTruthy();

            done();
        });
    });

    it("AND clicking on close button should close the advanced search panel", function(){
        //given
        expandingAdvancedSearch(function(){
            var closeBtn = element(by.css("#advancedSearchPartial .close"));

            //when
            closeBtn.click().then(function(){

                //then
                var advancedSearch = element(by.id("advancedSearchPartial"));
                expect(advancedSearch.isDisplayed()).not.toBeTruthy();
            });
        });
    });

    it("AND when it's expanded it should have all the fields", function(){
        expandingAdvancedSearch(function(){
            var filterText = element(by.css("#advancedSearchPartial .filter .h2"));
            var filterDropdown = element(by.model("condition"));
            var filterBtn = element(by.css("#advancedSearchPartial .filter button"));
            var filterCtrl = element(by.css("#advancedSearchPartial .filterCtrl"));
            var resultsText = element(by.css("#advancedSearchPartial .result .h2"));
            var resultsTable = element(by.css("#advancedSearchPartial .result table"));
            
            expect(filterText.isDisplayed()).toBeTruthy();
            expect(filterDropdown.isDisplayed()).toBeTruthy();
            expect(filterBtn.isDisplayed()).toBeTruthy();
            expect(filterCtrl.isDisplayed()).toBeTruthy();
            expect(resultsText.isDisplayed()).toBeTruthy();
            expect(resultsTable.isDisplayed()).toBeTruthy();
        });
    });

    it("AND when it's expanded it should have hits when applying a filter", function(){
        var clickingOnFirstFilter = function(options){
            options.get(1).click().then(clickingOnAddFilterButton); //explanation: 0.th element is the default empty option
        };

        var clickingOnAddFilterButton = function(){
            var filterBtn = element(by.css("#advancedSearchPartial .filter button"));
            filterBtn.click().then(expectsResult);
        };

        var expectsResult = function(){
            var resultsRows = element.all(by.css("#advancedSearchPartial .result table tr.resultHits"));
            expect(resultsRows.count()).toBeGreaterThan(0);

            resultsRows.each(function(resultRow){
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
            });
        };

        var allOptions = element.all(by.css("#advancedSearchPartial .filterAdd option"));
        clickingOnFirstFilter(allOptions);
    });

    //it should be merged into the previous test. I just make it only for visibility purposes
    xit("AND when it's expanded it should have hits when applying a filter - the missing parts", function(){
        var resultColDateOfBirth;
        var resultColLeague;

        //copy from
        expect(resultColDateOfBirth.isDisplayed()).toBeTruthy();
        resultColDateOfBirth.getText().then(function(text){
            expect(text.length).toBeGreaterThan(0);
        });

        expect(resultColLeague.isDisplayed()).toBeTruthy();
        resultColLeague.getText().then(function(text){
            expect(text.length).toBeGreaterThan(0);
        });
        //copy to
    });

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