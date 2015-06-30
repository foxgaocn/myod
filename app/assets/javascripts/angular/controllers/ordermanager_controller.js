angular.module('myodControllers')
  .controller('OrderManagerCtrl', ['$scope', '$window', '$modal', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.isCollapsed = true;
      $scope.query = {date:-1, status:-1, client_id: -1}
      $scope.dates=[{code:1, title:"最近1月"},
                    {code:3, title:"最近3月"},
                    {code:6, title:"最近6月"},
                    {code:12, title:"最近1年"},
                    {code:-1, title:"所有"}];
      $scope.statuses=[{code:1, title:"未完成"},
                    {code:2, title:"已完成"},
                    {code:-1, title:"所有"}];

      ClientService.info(function(data){
        $scope.clients = data;
        $scope.clients.push({id: -1, name: '所有' })
      });

      OrderService.get($scope.query, function(data){
        $scope.data = data;
      })

  }]);