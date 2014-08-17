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
        if(this.collection.get(id)) {
            this._propertyShow(id);
        } else {
            this.collection.once("sync", this._propertyShow.bind(this, id));
        }
    },
    _propertyShow: function(id) {
        var home = new PropertyShowView({
            model: this.collection.get(id)
        });
        this.stage.switchView(home);
    }
});

