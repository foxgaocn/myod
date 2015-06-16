angular.module('myodControllers')
  .controller('OrderCtrl', ['$scope', '$window', '$modal', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.all_products = [];
      $scope.products = [];
      $scope.product_ids = [];
      $scope.clients = [];
      $scope.order = {quantity: 1, status: OrderItemStatus[0].code, sale_price_unit: 0};
      $scope.valid_statuses = OrderItemStatus.slice(0,2);
      $scope.title = '请添加订单'
      $scope.title_class='alert alert-info'
      $scope.sale_price_units=[{code: 0, title:'人民币'}, {code:1, title:'澳元'}]

      ClientService.info(function(data){
        $scope.clients = data;
      });

      $scope.updateProducts = function(typed){
        if(typed == undefined) typed='';

        value = typed.trim().toLowerCase();

        if(value == ''){
          $scope.products = [];
          return;
        } 

        if ($scope.all_products.length == 0){
          ProductService.query(function(data){
            $scope.all_products = data;
          });
        }
        
        var match_products = $scope.all_products.filter(function(p){
          return p.name.indexOf(typed) > -1;
        })
        $scope.products = match_products.map(function(p){return p.name})
        $scope.product_ids = match_products.map(function(p){return p.id})
      };

      $scope.selectProduct = function(product){
        var index = $scope.products.indexOf(product);
        $scope.order.product_id = $scope.product_ids[index];
      }

      $scope.newClient = function(){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/create_client',
          controller: 'CreateClientCtrl',
          size: 'lg',
        });

        modalInstance.result.then(function (newClient) {
            $scope.clients.push({name: newClient.name, id: newClient.id})
            $scope.order.client_id = newClient.id;
            }, function () {}
        );
      }

      $scope.submit = function($event){
        var form = $($($event.currentTarget).parents('form'));
        if(form.hasClass('ng-invalid')){
          $window.alert('数据有错误，请先核对数据')
          return;
        }
        var product_index = $scope.products.indexOf($scope.order.product_name);
        $scope.order.product_id = $scope.product_ids[product_index]

        OrderService.save({order_item: $scope.order}, 
          function() {$scope.reset();}, 
          function(error){
            $scope.title = '对不起，出错了'
            $scope.title_class='alert alert-danger'} 
          );
      };

      $scope.reset = function(){
        if($scope.order.product_id == undefined || $scope.order.product_id == null){
          //we've created a new product, refresh the product list
          $scope.all_products = [];
        }
        $scope.order = {quantity: 1, client_id: $scope.order.client_id, status: $scope.order.status};
        $scope.valid_statuses = OrderItemStatus.slice(0,2);
        $scope.title = '添加成功,请继续'
        $scope.title_class='alert alert-success'
      }

  }]);