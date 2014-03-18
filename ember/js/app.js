var App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.FixtureAdapter
});