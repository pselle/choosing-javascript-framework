var App = App || {};

App.Property = Backbone.Model.extend({
    defaults: {
        streetAddress: '',
        zipCode: 0,
        currentAsk: 0,
        imagePath: ''
    }
});