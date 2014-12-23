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