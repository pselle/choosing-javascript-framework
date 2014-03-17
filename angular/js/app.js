var realtorsApp = angular.module('realtorsApp', ['ngRoute']);

var properties = [
    { address: '123 Sunflower Lane', zip: 20001, listingPrice: 200000 },
    { address: '983 Bluebell Lane', zip: 40503, listingPrice: 120000 },
    { address: '60 Iris Lane', zip: 19106, listingPrice: 350000 }
];

realtorsApp.controller('PropertyShowController', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.property = properties[$routeParams.propertyId];
    }
]);

realtorsApp.controller('PropertyController', ['$scope', 
    function($scope) {
        $scope.properties = properties;
    }
]);

realtorsApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'PropertyController',
        templateUrl: '/views/listPartial.html'
    })
    .when('/property/:propertyId', {
        controller: 'PropertyShowController',
        templateUrl: '/views/showPartial.html'
    })
    .otherwise({redirectTo: '/'});
});