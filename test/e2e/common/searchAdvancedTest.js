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