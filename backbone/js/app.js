var App = App || {};

App.Container = document.getElementById('content');

var data = [{
        id: 1,
        streetAddress: '123 Drury Lane',
        zipCode: 12345,
        currentAsk: 230000,
        imagePath: ''
    },
    {
        id: 2,
        streetAddress: '983 Lilac Blvd',
        zipCode: 20923,
        currentAsk: 1000000,
        imagePath: ''
    },
    {
        id: 3,
        streetAddress: '342 Spruce St',
        zipCode: 20923,
        currentAsk: 1000000,
        imagePath: ''
}];

App.defaultCollection = new App.PropertyCollection(data);

App.Router = Backbone.Router.extend({
    routes: {
        "property/:id": "showProperty",  
        "*other": "defaultRoute"
    },
    showProperty: function(id) {
        $(App.Container).html(new App.PropertyShowView({ model: App.defaultCollection.get(id) }).render().el);
    },
    defaultRoute: function() {
        $(App.Container).html(new App.PropertyListView({ collection: App.defaultCollection }).render().el);
    }
});

var appRouter = new App.Router();
Backbone.history.start();