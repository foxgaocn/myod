angular.module('myodServices').factory('ClientService', ['$resource', function($resource){
  return $resource('/clients.json', {},{
    query: { method: 'GET', isArray: true },
    save: { method: 'POST', headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} },
    info: { method: 'GET', url: '/clients/info.json', isArray: true}
  })
}]);