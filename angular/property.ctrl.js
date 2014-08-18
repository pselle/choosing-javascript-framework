(function (angular) {
  'use strict';

  angular.module('realtorsApp').controller('PropertiesController', ['$scope',
    function ($scope) {
      $scope.properties = properties;
    }
  ]);

})(window.angular);
