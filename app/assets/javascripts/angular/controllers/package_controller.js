angular.module('myodControllers')
  .controller('PackageCtrl', ['$scope', '$window', 'OrderService', '$modalInstance', 'items',
    function($scope, $window, OrderService, $modalInstance, items) {
      $scope.items = items;
      $scope.packed = [];
      //initialize the bought item list and construct the value list for html select
      for (var i = 0; i < items.length; i++) {
        $scope.items[i].values = [];
        for(j = 0; j<=$scope.items[i].quantity; j++){$scope.items[i].values.push(j)}
        $scope.packed[i] = {id: items[i].id, quantity: items[i].quantity}
      };

      $scope.ok = function ($event) {
        var form = $('#bought-form');
        if(form.hasClass('ng-invalid')){
          $window.alert('数据有误，请核对')
          return;
        }
        OrderService.bought({bought: $scope.bought},
          function(){
            $modalInstance.close($scope.bought);
          }, function(){
            $window.alert('抱歉，出错了');
          });

        
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


      $scope.$watch(
        function() { 
          return $scope.bought[0].buy_price 
        },function(newValue, oldValue) {
          for(i = 1; i<$scope.bought.length; i++){
            if($scope.bought[i].buy_price == oldValue || $scope.bought[i].buy_price == undefined){
              $scope.bought[i].buy_price = newValue;
            }
          }
        }
      );
  }]);