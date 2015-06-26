angular.module('myodServices').factory('PackageService', ['$resource', function($resource){
  return $resource('/packages.json', {},{
    next_label: { method: 'GET', url: 'packages/next_label/:client_id.json'},
    save: { method: 'POST', headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} },
    paid: { method: 'PUT', url: '/packages/:id.json', params: {id: '@id'}, headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} }, 
  })
}]);