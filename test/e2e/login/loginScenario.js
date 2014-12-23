describe('Scenario: Login module', function() {
    browser.get('#/login');

    var loginButton = element(by.className('btn'));
    var username = element(by.model('username'));
    var password = element(by.model('password'));

    it("login page should shown", function(){
        expect(loginButton.isDisplayed()).toBeTruthy();
        expect(username.isDisplayed()).toBeTruthy();
        expect(password.isDisplayed()).toBeTruthy();
    });
/*
    it("clicking on the login button should redirect the user to the dashboard page", function(done){
        browser.get('#/login');

        var loginButton = element(by.class('btn'));
        var username = element(by.model('username'));
        var password = element(by.model('password'));

        username.sendKeys("q");
        password.sendKeys("q");

        loginButton.click().then(function(){
            expect(browser.getLocationAbsUrl()).toMatch("/login");
            done();
        });
    });
*/
});