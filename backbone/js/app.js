boot(document.getElementById("content"));

function boot(el) {
  var properties = new Property.Collection();

  properties.fetch();

  var appRouter = new Router();
  var appView = new AppView({
      router: appRouter,
      collection: properties,
      el: el
  });
  Backbone.history.start();
}
