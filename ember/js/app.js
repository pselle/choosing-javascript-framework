var App = Ember.Application.create();

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('/shared/data.json');
  }
});
