var Router = Backbone.Router.extend({
    routes: {
        "property/:id": "propertyShow",  
        "": "propertyList",
        "*other": "propertyList"
    },
    initialize: function(opts) {
        this.stage = opts.stage;
        this.collection = opts.collection;
    },
    propertyList: function() {
        var view = new PropertyListView({
            collection: this.collection
        });
        this.stage.switchView(view);
    },
    propertyShow: function(id) {
        var view = new PropertyShowView({
            model: this.collection.get(id)
        });
        this.stage.switchView(view);
    },
});

