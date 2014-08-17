function boot(el) {
  var properties = new Property.Collection();

  properties.fetch();

  var appView = new StageView({
      el: el
  });
  var appRouter = new Router({
      collection: properties,
      stage: appView
  });
  Backbone.history.start();
}
