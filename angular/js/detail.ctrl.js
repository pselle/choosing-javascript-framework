(function (angular) {
  'use strict';

  angular.module('realtorsApp').controller('DetailController',
    function ($scope, $routeParams, Properties, $window) {

      // $routeParams.id retrieves the ID from the route
      Properties.getProperty($routeParams.id)
        .then(function success(property) {
          $scope.property = property;
        }, function failure(err) {
          $window.alert(err);
        });
    });

})(window.angular);
