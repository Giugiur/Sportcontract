describe('Scenario: SideMenu tests', function() {

    it("WHEN the user is logged in", function(done){
        loginTheUser(done);
    });

    it("THEN side menu should shown", function(){
        var sideMenu = element(by.id("sideMenu"));
        expect(sideMenu.isDisplayed()).toBeTruthy();
    });

    it("AND should have communication menu item", function(){
        var link = element(by.id("communicaionLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND should have organisation menu item", function(){
        var link = element(by.id("organisationLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND should have scouting menu item", function(){
        var link = element(by.id("scoutingLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    it("AND should have calendar menu item", function(){
        var link = element(by.id("calendarLink"));
        expect(link.isDisplayed()).toBeTruthy();
    });

    describe('WHEN testing links on user options', function(){
        afterEach(function(done){
            loginTheUser(done);
        });

        it("THEN 'communication' link should goes to the communication page", function(done){
            var link = element(by.id("communicaionLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/communication");
                done();
            });
        });

        xit("THEN 'organisation' link should goes to the organisation page", function(done){
            var link = element(by.id("organisationLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/organisation");
                done();
            });
        });

        xit("THEN 'scouting' link should goes to the scouting page", function(done){
            var link = element(by.id("scoutingLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/scouting");
                done();
            });
        });

        it("THEN 'calendar' link should goes to the calendar page", function(done){
            var link = element(by.id("calendarLink"));

            link.click().then(function(){
                expect(browser.getLocationAbsUrl()).toMatch("/calendar");
                done();
            });
        });
    });

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