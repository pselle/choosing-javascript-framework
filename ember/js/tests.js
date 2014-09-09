App.rootElement = '#qunit-fixture';
App.Router.location = 'none';

App.setupForTesting();
App.injectTestHelpers();

module('Tests', {
  setup: function() {
    Ember.run(App, 'reset');
  }
});

test('hiding a property', function() {
  visit('/');
  click('a:contains("409 Lavender Blvd")');
  click('button:contains("Hide this property")');
  andThen(function() {
    equal(currentURL(), '/');
    ok(find('*:contains("409 Lavender Blvd")').length === 0,
      'expected not to see 409 Lavender Blvd');
  });
});
