angular.module('myodServices').factory('OrderService', ['$resource', function($resource){
  return $resource('/order_items.json', {},{
    save: { method: 'POST', headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} }
  })
}]);