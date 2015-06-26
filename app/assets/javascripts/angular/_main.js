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

myod.value('OrderItemStatus',
  [ {code: 0, title: '待购买'},
    {code: 1, title: '待发货'},
    {code: 2, title: '待收款'},
    {code: 3, title: '已收款'}]
);

myod.value('PriceUnits',
  [ {code: 0, title: '人民币'},
    {code: 1, title: '澳元'}]
);



myod.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/view/home',
        controller: 'HomeCtrl'
      }).
      when('/order', {
        templateUrl: '/view/order',
        controller: 'OrderCtrl'
      }).
      when('/buy', {
        templateUrl: '/view/buy',
        controller: 'BuyCtrl'
      }).
      when('/send',{
        templateUrl: '/view/send',
        controller: 'SendCtrl'
      }).
      when('/pay',{
        templateUrl: '/view/pay',
        controller: 'PayCtrl'
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
