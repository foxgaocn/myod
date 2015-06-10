var ctrls = angular.module('myodControllers',[]);

ctrls.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.test = 'hello';
  }]);