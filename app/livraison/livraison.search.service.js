(function() {
    'use strict';

    angular
        .module('app')
        .factory('LivraisonSearch', LivraisonSearch);

    LivraisonSearch.$inject = ['$resource','API_URL'];

    function LivraisonSearch($resource,API_URL) {
        var resourceUrl = API_URL+'api/_search/livraisons/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/livraisons/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/livraisons/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
