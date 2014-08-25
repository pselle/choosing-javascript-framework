var App = Ember.Application.create();

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return [{
      streetAddress: '123 Foo Bar Avenue',
      zipCode: '01011',
      price: 1000000
    }];
  }
});
