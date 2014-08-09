var Property = Backbone.Model.extend();

Property.Collection = Backbone.Collection.extend({
    model: Property,
    url: function() {
      return "../api/properties.json";
    }
});
