(function() {
    'use strict';

    angular
        .module('app')
        .factory('LignelivraisonSearch', LignelivraisonSearch);

    LignelivraisonSearch.$inject = ['$resource','API_URL'];

    function LignelivraisonSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/lignelivraisons/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/lignelivraisons/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/lignelivraisons/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
