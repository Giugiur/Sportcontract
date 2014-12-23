describe('Scenario: Dashboard module - testing module', function() {

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

    it("THEN dashboard module should shown", function(){
        var dashboardModule = element(by.className("dashboardModule"));
        expect(dashboardModule.isDisplayed()).toBeTruthy();
    });

    it("THEN side menu should shown", function(){
        var sideMenu = element(by.id("sideMenu"));
        expect(sideMenu.isDisplayed()).toBeTruthy();
    });

    it("THEN dashboard should have a home tab activated", function(){
        var homeTab = element(by.className("title"));
        expect(homeTab.isDisplayed()).toBeTruthy(); 
    });

    it("THEN dashboard should have a home button in the tabs section", function(){
        var tabHome = element(by.id("tabHome"));
        expect(tabHome.isDisplayed()).toBeTruthy(); 
    });

    it("THEN dashboard should have a new button in the tabs section", function(){
        var tabNew = element(by.id("tabNew"));
        expect(tabNew.isDisplayed()).toBeTruthy();  
    });

    it("AND dashboard title should shown", function(){
        var moduleTitle = element(by.id("countriesTitle"));
        expect(moduleTitle.isDisplayed()).toBeTruthy();
        expect(moduleTitle.isDisplayed()).toBeTruthy();
    });

    it("AND countries list should shown", function(){
        var countriesList = element(by.className("countries"));
        expect(countriesList.isDisplayed()).toBeTruthy();
    });

    it("AND countries list should have all the countries", function(){
        var countriesList = element.all(by.css(".countries li"));
        expect(countriesList.count()).toBe(48);
    });

    it("AND clicking on a country should goes to the country page", function(done){
        var countriesList = element.all(by.css(".countries li"));
        var germanyListItem = countriesList.get(14);
        var germanyLink = germanyListItem.element(by.tagName("a"));

        germanyLink.click().then(function(){
            expect(browser.getLocationAbsUrl()).toMatch("/dashboard/leagues/21");
            done();
        });
    });
});
