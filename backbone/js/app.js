var App = App || {};

App.Container = document.getElementById('content');

App.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute",
        "property/:id": "showProperty"    
    },
    showProperty: function(id) {
        var property = App.PropertyModel.fetch(id);
        App.Container.innerHTML = new PropertyShowView({ model: property }).render().el;
    },
    defaultRoute: function() {
        var collection = App.PropertyCollection.fetch();
        App.Container.innerHTML = new PropertyListView({ collection: collection }).render().el;
    }
});

var appRouter = new App.Router();
Backbone.history.start({pushState: true});