angular.module('myodControllers')
  .controller('PackageManagerCtrl', ['$scope', '$window', '$modal', 'ProductService', 'PackageService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, PackageService, OrderService, OrderItemStatus) {
      $scope.title = '包裹管理'
      $scope.query = {date:1, status:1, client_id: -1}
      $scope.dates=[{code:1, title:"最近1月"},
                    {code:3, title:"最近3月"},
                    {code:6, title:"最近6月"},
                    {code:12, title:"最近1年"},
                    {code:-1, title:"所有"}];
      $scope.statuses=[{code:1, title:"未完成"},
                    {code:2, title:"已完成"},
                    {code:-1, title:"所有"}];


      PackageService.query($scope.query, function(data){
        $scope.clients = data;
      });

      $scope.query_package = function(){
        PackageService.query($scope.query, function(data){
          $scope.clients = data;
        });
      };

      $scope.getStatusString = function(statusCode){
        return OrderItemStatus.filter(function(p){return p.code == statusCode})[0].title
      }

      $scope.edit = function(id){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/edit_package',
          controller: 'EditPackageCtrl',
          size: 'lg',
          resolve: {
            package_id: function () {
              return id;
            }
          }
        });

        modalInstance.result.then(function() {}, function () {}
        );
      }

  }]);