var App = App || {};

App.Property = Backbone.View.extend({
    tagName: 'div',
    className: 'property',
    template: _.template('Listing'),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

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
    tagName: 'ul',
    render: function() {
        this.collection.each(function(item) {
            var item = new App.PropertyListItem({ model: item.toJSON() }).render().el;
            this.el.appendChild(item);
        }, this);
        return this;
    }
});