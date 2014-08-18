var Property = Backbone.Model.extend({
    defaults: {
        starred: false
    },
    star: function() {
        this.set("starred", !this.get("starred"));
        this.save();
    }
});

Property.Collection = Backbone.Collection.extend({
    model: Property,
    url: function() {
      return "/backbone/api/properties.json";
    }
});
