angular.module('myodServices').factory('ClientService', ['$resource', function($resource){
  return $resource('/clients/info.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);