(function (angular) {
  'use strict';

  angular.module('realtorsApp').controller('PropertiesController',
    function ($scope, Properties, $window) {

      Properties.getProperties()
        // here, we chain against the Promise returned by getProperties()
        .then(function success(properties) {
          $scope.properties = properties;
        }, function failure(err) {
          $window.alert(err);
        });
    });
})(window.angular);
