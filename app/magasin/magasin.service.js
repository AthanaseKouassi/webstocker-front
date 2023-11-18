(function() {
    'use strict';
    angular
        .module('app')
        .factory('Magasin', Magasin);

    Magasin.$inject = ['$resource','API_URL'];

    function Magasin ($resource,API_URL) {
        var resourceUrl = API_URL+'api/magasins/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/magasins/:id';
//        var resourceUrl =  'http://localhost:8080/api/magasins/:id';

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
