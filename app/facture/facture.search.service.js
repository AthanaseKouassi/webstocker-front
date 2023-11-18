(function() {
    'use strict';

    angular
        .module('app')
        .factory('FactureSearch', FactureSearch);

    FactureSearch.$inject = ['$resource','API_URL'];

    function FactureSearch($resource,API_URL) {
//        var resourceUrl =  'http://localhost:8080/api/_search/factures/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/factures/:id';
        var resourceUrl = API_URL+ 'api/_search/factures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
