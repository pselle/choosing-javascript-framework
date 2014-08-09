var AppView = Backbone.View.extend({
    initialize: function(opts) {
        this.router = opts.router;
        this.listenTo(this.router, "route:propertyShow", this.show, this);
        this.listenTo(this.router, "route:fallback", this.home, this);
    },
    home: function() {
        var home = new PropertyListView({
            collection: this.collection
        });
        this.switchView(home);
    },
    show: function(id) {

        if(this.collection.get(id)) {
            show.call(this);
        } else {
            this.collection.once("sync", show, this);
        }

        function show() {
            var home = new PropertyShowView({
                model: this.collection.get(id)
            });
            this.switchView(home);
        }
    },
    switchView: function(view) {
        if(this.view) {
            this.view.$el.fadeOut(150, function() {
                this.view.$el.remove();
                switchOver.call(this);
            }.bind(this));
        } else {
            switchOver.call(this);
        }

        function switchOver() {
            this.view = view;
            this.view.render();
            this.view.$el.hide().fadeIn(150);
            this.$el.append(this.view.el);
        }
    }
});

var PropertyShowView = Backbone.View.extend({
    tagName: 'div',
    className: 'property',
    template: getTemplate("property-show"),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

var PropertyListItem = Backbone.View.extend({
    tagName: 'tr',
    className: 'property-item',
    template: getTemplate("property-list-item"),
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});

var PropertyListView = CollectionView.extend({
    className: 'property-list',
    tagName: 'table',
    ItemView: PropertyListItem
});


function getTemplate(name) {
    return _.template(document.getElementById(name).innerHTML);
}
