describe('Scenario: Login module', function() {
    var loginButton, username, password;

    it('WHEN user landing on the login page', function(){
        browser.get('#/login');

        loginButton = element(by.className('btn'));
        username = element(by.model('username'));
        password = element(by.model('password'));
    });

    it("THEN login page should shown", function(){
        expect(loginButton.isDisplayed()).toBeTruthy();
        expect(username.isDisplayed()).toBeTruthy();
        expect(password.isDisplayed()).toBeTruthy();
    });

    xit("AND clicking on the login button it should redirect the user to the dashboard page", function(done){
        username.sendKeys("q");
        password.sendKeys("q");

        loginButton.click().then(function(){
            expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
            done();
        });
    });
});