var App = Ember.Application.create();

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('/shared/data.json');
  }
});

Ember.Handlebars.helper('format-number', function(number, format) {
  return numeral(number).format(format);
});
