var StageView = Backbone.View.extend({
    switchView: function(view) {
        if(this.view) {
            this.view.$el.fadeOut(150, switchOver.bind(this));
        } else {
            switchOver.call(this);
        }
        function switchOver() {
            if(this.view) this.view.$el.remove();
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
    initialize: function() {
      this.listenTo(this.model, "change:starred", this.renderStarred, this);
    },
    events: {
      "click .star": "starred"
    },
    render: function() {
        this.el.innerHTML = this.template(this.model.attributes);
        this.renderStarred();
        return this;
    },
    renderStarred: function() {
       this.$(".star").toggleClass("active",
         this.model.get("starred"));
    },
    starred: function(event) {
       this.model.star();
    },
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
