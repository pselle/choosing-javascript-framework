var CollectionView = Backbone.View.extend({
    constructor: function(opts) {
        if(!opts || !opts.collection) {
            throw new Error("Missing `collection` for CollectionView"); 
        }
        Backbone.View.apply(this, arguments);
        this.childrenByCid = {};
        this.listenTo(this.collection, "add", this.added, this);
        this.listenTo(this.collection, "remove", this.removed, this);
        this.listenTo(this.collection, "reset", this.reset, this);
    },
    render: function() {
        this.collection.forEach(this.added, this);
    },
    added: function(model) {
        var child = this.childrenByCid[model.cid] = new this.ItemView({ model: model });
        child.render();
        this.el.appendChild(child.el);
    },
    removed: function(model) {
        this.childrenByCid[model.cid].remove();
        delete this.childrenByCid;
    },
    remove: function() {
        this.removeAll();
        Backbone.View.prototype.remove.call(this);
    },
    reset: function() {
        this.removeAll();
        this.render();
    },
    removeAll: function() {
        _.invoke(this.childrenByCid, "remove");
        this.childrenByCid = {};
    },
    ItemView: function() {
        throw new Error("Missing ItemView subclass"); 
    },
});
