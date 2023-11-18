(function() {
    'use strict';

    angular
        .module('app')
        .factory('ProduitSearch', ProduitSearch);

    ProduitSearch.$inject = ['$resource','API_URL'];

    function ProduitSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/produits/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/produits/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/produits/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
