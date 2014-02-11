var realtorsApp = angular.module('realtorsApp', ['ngRoute']);

// realtorsApp.config(function($routeProvider) {
//     $routeProvider.when('/', {
//         controller: 'PropertyController',
//         templateUrl: '/views/listPartial.html'
//     })
//         .when('/property/:id', {
//             controller: 'PropertyController',
//             templateUrl: '/views/showProperty.html'
//         })
//         .otherwise({redirectTo: '/'});
// });

realtorsApp.controller('PropertyController', function($scope) {
    $scope.properties = [
        { address: '123 Sunflower Lane', zip: 20001, listingPrice: 200000 },
        { address: '983 Bluebell Lane', zip: 40503, listingPrice: 120000 },
        { address: '60 Iris Lane', zip: 19106, listingPrice: 350000 }
    ];
});