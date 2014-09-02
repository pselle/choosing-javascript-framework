var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('property', { path: 'properties/:property_id' });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('/shared/data.json');
  }
});

App.PropertyRoute = Ember.Route.extend({
  model: function(params) {
    var id         = parseInt(params.property_id, 10);
    var properties = this.modelFor('application');
    var property   = properties.findBy('id', id);

    return property;
  }
});

App.IndexController = Ember.ArrayController.extend({
  queryParams: ['sortAscending'],
  sortProperties: ['price']
});

Ember.Handlebars.helper('format-number', function(number, format) {
  return numeral(number).format(format);
});
