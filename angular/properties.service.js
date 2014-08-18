(function (angular) {
  'use strict';

  angular.module('realtorsApp').factory('Properties', function ($http) {

    /**
     * Get all available property data.
     */
    var getProperties = function getProperties() {
      return $http.get('../shared/data.json');
    };

    return {
      getProperties: getProperties
    };

  });

})(window.angular);
