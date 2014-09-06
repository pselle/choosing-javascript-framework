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

App.PropertyController = Ember.ObjectController.extend({
  fullAddress: function() {
    return [
      this.get('streetAddress'),
      this.get('zipCode'),
      'USA'
    ].join(', ');
  }.property('streetAddress', 'zipCode')
});

Ember.Handlebars.helper('format-number', function(number, format) {
  return numeral(number).format(format);
});

App.LeafletMapComponent = Ember.Component.extend({
  tagName: 'leaflet-map',
  attributeBindings: ['style'],
  zoom: 13,

  style: function() {
    return 'display: block; width: %@px; height: %@px;'.fmt(
      this.get('width'),
      this.get('height')
    );
  }.property('width', 'height'),

  locateAddress: function() {
    var address = this.get('address');

    this.lookupLatLng(address).then(Ember.run.bind(this, function(latLng) {
      this.get('marker').setLatLng(latLng);
      this.set('latLng', latLng);
    }));
  }.on('didInsertElement').observes('address'),

  setView: function() {
    this.get('map').setView(this.get('latLng'), this.get('zoom'));
  }.observes('latLng', 'zoom'),

  map: function() {
    if (!this._map) {
      this._map = L.map(this.get('element'));

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this._map);
    }

    return this._map;
  }.property(),

  marker: function() {
    if (!this._marker) {
      this._marker = L.marker();
      this._marker.addTo(this.get('map'));
    }

    return this._marker;
  }.property(),

  lookupLatLng: function(address) {
    var url = 'https://maps.googleapis.com' +
              '/maps/api/geocode/json?address=' + address;

    return $.getJSON(url).then(function(response) {
      var result = response.results[0];

      if (result) {
        var location = result.geometry.location;
        var lat = location.lat;
        var lng = location.lng;

        return [lat, lng];
      } else {
        throw new Error('Could not locate address: ' + address);
      }
    });
  }
});
