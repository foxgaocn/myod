var ctrls = angular.module('myodControllers',['autocomplete']);

ctrls.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.test = 'hello';
  }]);