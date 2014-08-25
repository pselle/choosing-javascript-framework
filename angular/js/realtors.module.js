(function (angular) {
  'use strict';

  angular.module('realtorsApp', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        controller: 'PropertiesController',
        templateUrl: 'views/properties.html'
      })
        .when('/detail/:id', {
          controller: 'DetailController',
          templateUrl: 'views/detail.html'
        })
        .otherwise({redirectTo: '/'});
    });

})(window.angular);
