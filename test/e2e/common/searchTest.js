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

    describe('WHEN: testing clickabiliby on each section', function() {
        beforeEach(function(){
            var searchField = element(by.model("search.searchterm"));
            searchField.sendKeys("ger");
        });

        afterEach(function(done){
            var tabs = element.all(by.css(".dashboardModule ul.etabs li"));
            var closable = tabs.get(1).element(by.css(".closeTab a"));

            closable.click().then(function(){
                done();
            });
        });

        it("AND clicking on a player hit should load the player page", function(){
            var allPlayers = element.all(by.css("#playersCol li"));
            var playerLink = allPlayers.first().element(by.css("a"));
            var removablePart = "Player: ";

            verifyClickability(playerLink, removablePart);
        });

        xit("AND clicking on a staff hit should load the staff page", function(){});

        it("AND clicking on a team hit should load the team page", function(){
            var allTeams = element.all(by.css("#teamsCol li"));
            var teamLink = allTeams.first().element(by.css("a"));
            var removablePart = "Players of ";

            verifyClickability(teamLink, removablePart);
        });

        it("AND clicking on a league hit should load the league page", function(){
            var allTeams = element.all(by.css("#leaguesCol li"));
            var leagueLink = allTeams.first().element(by.css("a"));
            var removablePart = "Teams of ";

            verifyClickability(leagueLink, removablePart); 
        });

        it("AND clicking on a country hit should load the country page", function(){
            var allTeams = element.all(by.css("#countriesCol li"));
            var countryLink = allTeams.first().element(by.css("a"));
            var removablePart = "Leagues of ";

            verifyClickability(countryLink, removablePart);  
        });
    });

    var verifyClickability = function(clickableElement, removablePart){
        clickableElement.element(by.css(".name")).getText().then(function(playerName){
            clickableElement.click().then(function(){
                var tabs = element.all(by.css(".dashboardModule ul.etabs li"));
                var activeTab = element(by.css(".dashboardModule ul.etabs li.active"));
                var tabName = activeTab.element(by.css("a.title"));

                expect(tabs.count()).toBe(2);
                expect(activeTab.isDisplayed()).toBeTruthy();

                tabs.first().getText().then(function(text){
                    expect(text).toBe("Home");
                });

                tabName.getText().then(function(text){
                    text = text.substr(removablePart.length);
                    expect(text.length).toBeGreaterThan(0);
                    expect(text).not.toBe("Home");

                    expect(playerName.indexOf(text)).not.toBe(-1);
                    expect(playerName.indexOf(text)).toBeGreaterThan(-1);
                });
            });
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