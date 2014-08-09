boot(document.getElementById("content"));

function boot(el) {
  var properties = new Property.Collection();

  properties.fetch();
  properties.on("error", function(e, err) {
    console.error(e, err);
  });

  var appRouter = new Router();
  var appView = new AppView({
      router: appRouter,
      collection: properties,
      el: el
  });
  Backbone.history.start();
}
