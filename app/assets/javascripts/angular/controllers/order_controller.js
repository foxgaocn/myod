angular.module('myodControllers')
  .controller('OrderCtrl', ['$scope', '$window', '$modal', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.all_products = [];
      $scope.products = [];
      $scope.product_ids = [];
      $scope.clients = [];
      $scope.order = {quantity: 1, status: OrderItemStatus[0].code};
      $scope.title = '请添加订单'
      $scope.title_class='alert alert-info'

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
          return p.name.toLowerCase().indexOf(typed.toLowerCase()) > -1;
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
            $scope.clients.push({name: newClient.name, id: newClient.id, price_unit_string: newClient.price_unit_string})
            $scope.order.client_id = newClient.id;
            $scope.price_unit = newClient.price_unit_string
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
        $scope.title = '添加成功,请继续'
        $scope.title_class='alert alert-success'
        $scope.total_price = 0
      };

      $scope.clientChanged = function(client_id){
        $scope.price_unit = $scope.clients.filter(function(c){return c.id == client_id})[0].price_unit_string
      }

      $scope.unit_price_changed = function(unit_price){
        $scope.total_price = unit_price * $scope.order.quantity
      }

      $scope.total_price_changed = function(total_price){
        $scope.order.sale_price = parseFloat((total_price / $scope.order.quantity).toFixed(2))
      }

      $scope.quantity_changed = function(quantity){
        if($scope.order.sale_price){
          $scope.total_price = parseFloat(($scope.order.sale_price * quantity).toFixed(2))
        }
      }

      $scope.quantity_blur = function(){
        if($scope.order.quantity == ''){
          $scope.order.quantity = $scope.previous_quantity
        }
      }

      $scope.quantity_clicked = function(){
        $scope.previous_quantity = $scope.order.quantity;
        $scope.order.quantity = ''
      }



  }]);