var App = App || {};

App.PropertyListItem = Backbone.View.extend({
    tagName: 'li',
    className: 'property-item',
    template: _.template('Listing'),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

App.PropertyListView = Backbone.View.extend({
    className: 'property-list',
    render: function() {
        this.collection.each(new PropertyListItem(this.model).render().el);
        return this;
    }
});