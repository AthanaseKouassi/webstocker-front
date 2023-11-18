(function() {
    'use strict';

    angular
        .module('app')
        .factory('ClientSearch', ClientSearch);

    ClientSearch.$inject = ['$resource', 'API_URL'];

    function ClientSearch($resource, API_URL) {
        var resourceUrl =  API_URL+'api/_search/clients/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/clients/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/clients/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
