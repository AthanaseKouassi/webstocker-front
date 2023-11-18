(function() {
    'use strict';
    angular
        .module('app')
        .factory('CategorieParNomService', CategorieParNomService);

    CategorieParNomService.$inject = ['$resource','API_URL'];

    function CategorieParNomService ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/categories//parnomcategorie/:nomCategorie';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/categories//parnomcategorie/:nomCategorie';
//        var resourceUrl =  'http://localhost:8080/api/categories/parnomcategorie/:nomCategorie';

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
