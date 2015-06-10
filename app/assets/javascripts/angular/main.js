'use strict';

/* App Module */

var myod = angular.module('myod', [
  'ngRoute',
  "ui.bootstrap",
  'myodControllers',
  'myodServices'
]);


myod.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '../templates/home.html',
        controller: 'HomeCtrl'
      }).
      when('/order', {
        templateUrl: '../templates/order.html',
        controller: 'OrderCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
