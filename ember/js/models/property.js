// Without Ember Data
// App.Property = Ember.Object.extend({});

// With Ember Data (to leverage fixtures)
App.Property = DS.Model.extend({
    address: DS.attr('string'),
    zip: DS.attr('number'),
    price: DS.attr('number')
});

App.Property.FIXTURES = [{
    id: 1,
    address: '1123 Sunny Road',
    zip: 37890,
    price: 230000
}, {
    id: 2,
    address: '409 Lavender Blvd',
    zip: 19106,
    price: 120000
}, {
    id: 3,
    address: '347 Lotus Lane',
    zip: 10001,
    price: 160000
}, {
    id: 4,
    address: '23 Daisy Parkway',
    zip: 40502,
    price: 1000000
}];
