(function() {
    'use strict';
    angular
        .module('app')
        .factory('Commune', Commune);

    Commune.$inject = ['$resource','API_URL'];

    function Commune ($resource, API_URL) {
//        var resourceUrl =  'http://localhost:8080/api/communes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/communes/:id';
        var resourceUrl =  API_URL+'api/communes/:id';

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
