angular.module('myodServices').factory('PackageService', ['$resource', function($resource){
  return $resource('/packages.json', {},{
    next_label: { method: 'GET', url: 'packages/next_label.json', isArray: true},
  })
}]);