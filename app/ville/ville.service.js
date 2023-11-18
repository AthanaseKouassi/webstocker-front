(function() {
    'use strict';
    angular
        .module('app')
        .factory('Ville', Ville);

    Ville.$inject = ['$resource','API_URL'];

    function Ville ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/villes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/villes/:id';
//        var resourceUrl =  'http://localhost:8080/api/villes/:id';

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
