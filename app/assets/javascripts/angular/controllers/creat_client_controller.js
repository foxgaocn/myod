angular.module('myodControllers')
  .controller('CreateClientCtrl', ['$scope', '$window', 'ClientService', 'PriceUnits', '$modalInstance',
    function($scope, $window, ClientService, PriceUnits, $modalInstance) {
      $scope.title = "创建新客户"
      $scope.price_units = PriceUnits
      $scope.client={price_unit: PriceUnits[0].code}

      $scope.ok = function ($event) {
        var form = $('#create_client_form');
        if(form.hasClass('ng-invalid')){
          $window.alert('请输入客户名')
          return;
        }
        ClientService.save({client: $scope.client}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
          );
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);