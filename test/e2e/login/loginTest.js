describe('Scenario: Login module', function() {
    describe('WHEN checking page', function() {
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
    });

    describe('WHEN checking success login case', function() {
        var loginButton, username, password;

        it('GIVEN user landing on the login page', function(){
            browser.get('#/login');

            loginButton = element(by.className('btn'));
            username = element(by.model('username'));
            password = element(by.model('password'));
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

    describe('WHEN checkng bad username/password case', function() {
        var loginButton, username, password;

        it('WHEN user landing on the login page', function(){
            browser.get('#/login');

            loginButton = element(by.className('btn'));
            username = element(by.model('username'));
            password = element(by.model('password'));
        });

        it("AND clicking on the login button it should stay on the login page", function(done){
            username.sendKeys("q");
            password.sendKeys("wrong_password");

            loginButton.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/login");
                done();
            });
        });
    });
});