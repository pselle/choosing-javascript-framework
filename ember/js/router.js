App.Router.map(function() {
    this.resource('properties', { path: '/' }); 
    this.resource('property', { path: '/property/:property_id' });
});

App.PropertiesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('property');
    }
});

// App.PropertyRoute = Ember.Route.extend({
//     model: function(params) {
//         return this.store.find('property', params.property_id);
//     }
// });