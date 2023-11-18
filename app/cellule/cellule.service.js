(function() {
    'use strict';
    angular
        .module('app')
        .factory('Cellule', Cellule);

    Cellule.$inject = ['$resource','API_URL'];

    function Cellule ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/cellules/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/cellules/:id';
//        var resourceUrl =  'http://localhost:8080/api/cellules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
