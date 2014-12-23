describe('Scenario: User Option tests', function() {
    //logging in
    it("WHEN the user is logged in", function(done){
        loginTheUser(done);
    });

    it("THEN user options section should shown", function(){
        var userOptions = element(by.className("userOptions"));
        expect(userOptions.isDisplayed()).toBeTruthy();
    });

    it("AND clicking on the user options section it should show more details", function(done){
        expandingUserOptions(done);
    });

    it("AND my profile link shoud shown", function(){
        var link = element(by.id("myProfileLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND settings link shoud shown", function(){
        var link = element(by.id("settingsLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND admin link shoud shown", function(){
        var link = element(by.id("adminLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND sign out link shoud shown", function(){
        var link = element(by.id("signOutLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND when clicking on the user options section when it's expanded THEN it should be collapsed", function(done){
        var dropdownTrigger = element(by.id("dropdownTrigger"));
        dropdownTrigger.click().then(function(){
            var dropdownExpanded = element(by.id("dropdownExpanded"));
            expect(dropdownExpanded.isDisplayed()).not.toBeTruthy();

            done();
        });
    });

    describe('WHEN testing links on user options', function(){
        beforeEach(function(done){
            expandingUserOptions(done);
        });

        afterEach(function(done){
            loginTheUser(done);
        });

        xit("THEN 'my profile' link should goes to the profile page", function(done){
            var link = element(by.id("myProfileLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/dashboard/profile");
                done();
            });
        });

        it("THEN 'settings' link should goes to the settings page", function(done){
            var link = element(by.id("settingsLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/settings");
                done();
            });
        });

        xit("THEN 'admin' link should goes to the admin login page", function(done){
            var link = element(by.id("adminLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/admin");
                done();
            });
        });

        it("THEN 'sign out' link should goes to the login page", function(done){
            var link = element(by.id("signOutLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/login");
                done();
            });
        });
    });

    var expandingUserOptions = function(done){
        var dropdownTrigger = element(by.id("dropdownTrigger"));
        dropdownTrigger.click().then(function(){
            var dropdownExpanded = element(by.id("dropdownExpanded"));
            expect(dropdownExpanded.isDisplayed()).toBeTruthy();

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