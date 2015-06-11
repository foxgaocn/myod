angular.module('myodControllers')
  .controller('HomeCtrl', ['$scope', 'LoginService',
    function($scope, LoginService) {
      $scope.test = 'hello';
      
      $scope.signout = function(){
        LoginService.delete(function(){
          alert('signed out')
          window.location='/'
        });
    }
  }]);