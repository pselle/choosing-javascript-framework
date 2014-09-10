var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('property', { path: 'properties/:property_id' });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('/shared/data.json');
  },

  actions: {
    hideProperty: function(property) {
      this.modelFor('application').removeObject(property);
      this.transitionTo('index');
    }
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
  }.property('streetAddress', 'zipCode'),

  isFavorite: function(name, value) {
    var id = this.get('id');
    var key = 'favorites.' + id;

    // If 2 arguments are received then we’re setting this property.
    if (arguments.length === 2) {
      if (value) {
        window.localStorage[key] = true;
      } else {
        delete window.localStorage[key];
      }
    }

    return window.localStorage[key];
  }.property('id'),

  actions: {
    toggleFavorite: function() {
      this.toggleProperty('isFavorite');
    }
  }
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

    if (address) {
      lookupLatLng(address).then(function(latLng) {
        this.set('latLng', latLng);
      }.bind(this));
    }
  }.observes('address').on('didInsertElement'),

  updateMapAndMarker: function() {
    var latLng = this.get('latLng');
    var zoom = this.get('zoom');

    if (latLng && zoom) {
      var map = this.get('map');
      var marker = this.get('marker');

      map.setView(latLng, zoom);
      marker.setLatLng(latLng);
    }
  }.observes('latLng', 'zoom').on('didInsertElement'),

  map: function() {
    var element = this.get('element');
    var map = L.map(element);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
  }.property(),

  marker: function() {
    var map = this.get('map');
    var marker = L.marker([0, 0]);

    marker.addTo(map);

    return marker;
  }.property()
});

function lookupLatLng(address) {
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
