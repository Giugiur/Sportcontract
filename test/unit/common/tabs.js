describe("Testing Tabs", function() {

  beforeEach(module('app'));

  

  it('should contain an tabs service',
    inject(function(Tabs) {
    expect(Tabs).not.to.equal(null);
  }));

  it('should have the tab functions',
    inject(['Tabs',function(Tabs) {

    expect(Tabs.initTabs).not.to.equal(null);
    expect(Tabs.newTab).not.to.equal(null);
    expect(Tabs.closeTab).not.to.equal(null);
    expect(Tabs.getTabs).not.to.equal(null);
  }]));


  it('should init with one tab (home)',
    inject(['Tabs',function(Tabs) {

    Tabs.initTabs();
    var tabs = Tabs.getTabs();
    expect(Tabs.getTabs().length).to.equal(1);

  }]));
  

});