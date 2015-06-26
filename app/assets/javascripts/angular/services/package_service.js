angular.module('myodServices').factory('PackageService', ['$resource', function($resource){
  return $resource('/packages.json', {},{
    query: { method: 'GET', isArray: true },
    next_label: { method: 'GET', url: 'packages/next_label/:client_id.json'},
    save: { method: 'POST', headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} }, 
  })
}]);