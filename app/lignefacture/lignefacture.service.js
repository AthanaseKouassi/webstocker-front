(function() {
    'use strict';
    angular
        .module('app')
        .factory('Lignefacture', Lignefacture);

    Lignefacture.$inject = ['$resource','API_URL'];

    function Lignefacture ($resource, API_URL) {
        var resourceUrl =  API_URL+'api/lignefactures/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/lignefactures/:id';
//        var resourceUrl =  'http://localhost:8080/api/lignefactures/:id';

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
