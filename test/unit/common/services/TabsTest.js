describe("Testing Tabs", function() {
  var $state, templates;

  beforeEach(module('ui.router'));
  beforeEach(module('app.common'));
  beforeEach(module('app'));

  it('should contain an tabs service', inject(function(Tabs) {
    expect(Tabs).not.toEqual(null);
  }));

  it('should have the tab functions', inject(['Tabs',function(Tabs) {
    expect(Tabs.initTabs).not.toEqual(null);
    expect(Tabs.newTab).not.toEqual(null);
    expect(Tabs.closeTab).not.toEqual(null);
    expect(Tabs.getTabs).not.toEqual(null);
  }]));

  it('should init with one tab (home)', inject(['Tabs',function(Tabs) {
    Tabs.initTabs();
    var tabs = Tabs.getTabs();
    expect(Tabs.getTabs().length).toEqual(1);
  }]));
});