angular.module('myodServices').factory('ProductService', ['$resource', function($resource){
  return $resource('/products/info.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);