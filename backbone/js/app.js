var App = App || {};

App.Container = document.getElementById('content');

var property1 = new App.Property();
var property2 = new App.Property();
App.defaultCollection = new App.PropertyCollection([property1, property2]);

App.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute",
        "backbone": "defaultRoute",
        "property/:id": "showProperty"    
    },
    showProperty: function(id) {
        App.Container.appendChild(new App.PropertyShowView({ model: property }).render().el);
    },
    defaultRoute: function() {
        App.Container.appendChild(new App.PropertyListView({ collection: App.defaultCollection }).render().el);
    }
});

var appRouter = new App.Router();
Backbone.history.start({pushState: true});