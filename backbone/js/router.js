var Router = Backbone.Router.extend({
    routes: {
        "property/:id": "propertyShow",  
        "*other": "fallback"
    }
});

