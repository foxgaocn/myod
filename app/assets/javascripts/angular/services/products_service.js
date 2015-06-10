
angular.module('myodServices',[]).factory('ProductNames', ['$resource',function($resource){
  return $resource('/products/names.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);