(function() {
    'use strict';

    angular
        .module('app')
        .factory('CategorieSearch', CategorieSearch);

    CategorieSearch.$inject = ['$resource','API_URL'];

    function CategorieSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/categories/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/categories/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/categories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
