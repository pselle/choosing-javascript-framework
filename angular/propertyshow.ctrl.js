(function (angular) {
  'use strict';

  angular.module('realtorsApp').controller('PropertyShowController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.property = properties[$routeParams.propertyId];
    }
  ]);

})(window.angular);
