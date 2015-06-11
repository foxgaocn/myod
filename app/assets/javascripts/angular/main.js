'use strict';

/* App Module */

angular.module('myodControllers',['autocomplete']);
angular.module('myodServices',[]);

var myod = angular.module('myod', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
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
      when('/signed_out', {
        controller : function(){
            window.location.replace('/users/sign_in');
          }, 
        template : "<div></div>"

      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
