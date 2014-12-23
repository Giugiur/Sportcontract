describe('Scenario: Dashboard module - testing sideMenu', function() {
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
});