// Without Ember Data
// App.Property = Ember.Object.extend({});

App.Property = DS.Model.extend({
    address: DS.attr('string')
});

//todo
App.Property.FIXTURES = [
    {
        id: 1,
        address: '1123 Sunny Road'
    },
    {
        id: 2,
        address: '409 Lavender Blvd'
    },
    {
        id: 3,
        address: '347 Lotus Lane'
    },
    {
        id: 4,
        address: '23 Daisy Parkway'
    }
];