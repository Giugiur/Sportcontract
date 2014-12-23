describe('Scenario: Dashboard module - testing header', function() {
    //logging in
    it("WHEN the user is logged in", function(done){
        browser.get('#/login');

        var loginButton = element(by.className('btn'));
        var username = element(by.model('username'));
        var password = element(by.model('password'));

        username.sendKeys("q");
        password.sendKeys("q");

        loginButton.click().then(function(){
            done();
        });
    });    

    it("THEN header should shown", function(){
        var header = element(by.id("header"));
        expect(header.isDisplayed()).toBeTruthy();
    });

    it("AND logo should shown", function(){
        var logo = element(by.className("logo"));
        expect(logo.isDisplayed()).toBeTruthy();
    });

    describe("WHEN testing search field section", function(){
        it("THEN search icon should shown", function(){
            var searchIcon = element(by.className("fa-search"));
            expect(searchIcon.isDisplayed()).toBeTruthy();
        });

        it("AND search field should shown", function(){
            var searchField = element(by.model("search.searchterm"));
            expect(searchField.isDisplayed()).toBeTruthy();
        });

        it("AND advanced search link should shown", function(){
            var searchPlus = element(by.id("fa-plus-link"));
            expect(searchPlus.isDisplayed()).toBeTruthy();
        });

        it("AND clicking on advanced search icon the adcanced search section should shown", function(done){
            var searchPlus = element(by.id("fa-plus-link"));
            searchPlus.click().then(function(){
                var advancedSearch = element(by.id("advancedSearchPartial"));
                expect(advancedSearch.isDisplayed()).toBeTruthy();

                done();
            });
        });

        it("AND when clicking on advanced search icon when it's expanded THEN it should shown not be hidden", function(done){
            var searchPlus = element(by.id("fa-plus-link"));
            searchPlus.click().then(function(){
                var advancedSearch = element(by.id("advancedSearchPartial"));
                expect(advancedSearch.isDisplayed()).not.toBeTruthy();

                done();
            });
        });
    });

    describe("WHEN testing user options section", function(){
        it("THEN user options section should shown", function(){
            var userOptions = element(by.className("userOptions"));
            expect(userOptions.isDisplayed()).toBeTruthy();
        });
    });
});