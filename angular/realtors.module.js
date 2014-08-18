(function (angular) {
  'use strict';

  angular.module('realtorsApp', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        controller: 'PropertyController',
        templateUrl: '/angular/views/listPartial.html'
      })
        .when('/property/:propertyId', {
          controller: 'PropertyShowController',
          templateUrl: '/angular/views/showPartial.html'
        })
        .otherwise({redirectTo: '/'});
    });

})(window.angular);

