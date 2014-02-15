var App = App || {};

App.PropertyView = Backbone.View.extend({
    tagName: 'div',
    className: 'property',
    template: _.template('Listing'),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

App.PropertyListItem = Backbone.View.extend({
    tagName: 'tr',
    className: 'property-item',
    template: _.template('<td><%= streetAddress %></td>'
        + '<td><%= zipCode %></td>'
        + '<td><%= currentAsk %></td>'),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

App.PropertyListView = Backbone.View.extend({
    className: 'property-list',
    tagName: 'table',
    render: function() {
        this.collection.each(function(item) {
            this.renderProperty(item);
        }, this);
        return this;
    },
    renderProperty: function(item) {
        var item = new App.PropertyListItem({ model: item });
        this.el.appendChild(item.render().el);        
    }
});