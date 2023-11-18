(function() {
    'use strict';
    angular
        .module('app')
        .factory('Fabricant', Fabricant);

    Fabricant.$inject = ['$resource','API_URL'];

    function Fabricant ($resource, API_URL) {
        var resourceUrl = API_URL+ 'api/fabricants/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/fabricants/:id';
//        var resourceUrl =  'http://localhost:8080/api/fabricants/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'getParProduit': {
//                url : 'http://localhost:8080/api/fabricants/produit/:id',
//                url : 'http://83.166.138.228:8080/api/fabricants/produit/:id',
                url :  API_URL+'api/fabricants/produit/:id',
                method: 'GET',
                isArray: true
            }

        });
    }
})();
