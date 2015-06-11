angular.module('myodControllers')
  .controller('OrderCtrl', ['$scope', 'ProductService',
    function($scope, ProductService) {

      $scope.products = [];

      $scope.updateProducts = function(typed){
        ProductService.query(function(data){
            $scope.products = data;
          });
      }
  }]);