describe('Scenario: Search tests', function() {

    it("WHEN the user is logged in", function(done){
        loginTheUser(done);
    });

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

    it("WHEN searching for 'ger' should shown up quick search panel", function(){
        //given
        var searchField = element(by.model("search.searchterm"));
        var quickSearch = element(by.className("quickSearch"));
        expect(quickSearch.isDisplayed()).not.toBeTruthy();

        //when
        searchField.sendKeys("ger");

        //then
        expect(quickSearch.isDisplayed()).toBeTruthy();
    });

    it("AND it should have hits for all sections", function(){
        //then
        var allPlayers = element.all(by.css("#playersCol li"));
        var allStaffs = element.all(by.css("#staffCol li"));
        var allTeams = element.all(by.css("#teamsCol li"));
        var allLeagues = element.all(by.css("#leaguesCol li"));
        var allCountries = element.all(by.css("#countriesCol li"));
        

        expect(allPlayers.count()).toBeGreaterThan(0);
        expect(allStaffs.count()).toBeGreaterThan(0);
        expect(allTeams.count()).toBeGreaterThan(0);
        expect(allLeagues.count()).toBeGreaterThan(0);
        expect(allCountries.count()).toBeGreaterThan(0);
    });

    it("AND clicking on close button should close the quick search panel", function(){
        var closeBtn = element(by.css("#quickSearch .close"));

        closeBtn.click().then(function(){
            var quickSearch = element(by.className("quickSearch"));
            expect(quickSearch.isDisplayed()).not.toBeTruthy();
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