describe('Scenario: Dashboard module - testing header', function() {

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

    it("AND search field should shown", function(){
        var searchField = element(by.model("search.searchterm"));
        expect(searchField.isDisplayed()).toBeTruthy();
    });

    it("AND user options section should shown", function(){
        var userOptions = element(by.className("userOptions"));
        expect(userOptions.isDisplayed()).toBeTruthy();
    });
});