(function (angular) {
  'use strict';

  angular.module('realtorsApp').factory('Properties', function ($http, $q) {

    /**
     * Namespace for our factory.  If
     * @type {{getProperties: getProperties, getProperty: getProperty}}
     */
    var factory = {

      /**
       * Lookup of property ID to property object.
       * @type {Object}
       */
      propertyCache: {},

      /**
       * Array of property objects
       * @type {Array}
       */
      properties: [],

      /**
       * Get all available property data.
       * @returns {Promise}
       */
      getProperties: function getProperties() {
        var properties = factory.properties;

        // if our properties already exist, then we simply return them.  however, since getProperties() is
        // asynchronous and returns a Promise otherwise, it behooves us to always return a Promise.
        // $q.when() does just that; it will take any value and wrap it in a resolved Promise.
        if (properties.length) {
          return $q.when(properties);
        }

        return $http.get('/shared/data.json')
          .then(function (res) {
            var properties = res.data;

            // if for some reason we encounter an error, we need to *reject* our Promise.
            // throwing an exception here would work similarly.
            if (!(properties && properties.length)) {
              return $q.reject('Invalid data returned from server!');
            }

            // iterate through each property and save it to our propertyCache, keyed on its ID.
            properties.forEach(function (property) {
              factory.propertyCache[property.id] = property;
            });

            // save the properties array
            factory.properties = properties;
            return properties;
          });
      },

      /**
       * Get property data for one ID.
       * @param {Number} id Property ID
       * @returns {Promise}
       */
      getProperty: function getProperty(id) {
        // calling getProperties() here will get all the properties from the server if we have none,
        // or simply returned the cached data.  this is useful if the user navigates directly to a controller
        // which does not explicitly call getProperties(), such as DetailController.
        // note that we don't use the return value from getProperties(); we aren't interested in that,
        // just its side-effect, a populated factory.propertyCache object.
        return factory.getProperties()
          .then(function () {
            var property = factory.propertyCache[id];
            if (!property) {
              return $q.reject('No property with ID "' + id + '" found!');
            }
            return property;
          });
      }
    };

    return factory;

  });

})(window.angular);
