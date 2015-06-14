angular.module('myodControllers')
  .controller('OrderCtrl', ['$scope', '$window', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.all_products = [];
      $scope.products = [];
      $scope.product_ids = [];
      $scope.clients = [];
      $scope.order = {quantity: 1, status: OrderItemStatus[0].code};
      $scope.valid_statuses = OrderItemStatus.slice(0,2);
      $scope.title = '请添加商品'

      ClientService.query(function(data){
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
          templateUrl: 'createClient.html',
          controller: 'CreateClientCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
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
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
          );
      };

      $scope.reset = function(){
        if($scope.order.product_id == undefined || $scope.order.product_id == null){
          //we've created a new product, refresh the product list
          $scope.all_products = [];
        }
        $scope.title = '添加成功,继续或返回'
        $scope.order = {quantity: 1, status: OrderItemStatus[0].code};
        $scope.valid_statuses = OrderItemStatus.slice(0,2);
      }

  }]);