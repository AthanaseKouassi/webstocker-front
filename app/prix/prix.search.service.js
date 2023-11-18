(function() {
    'use strict';

    angular
        .module('app')
        .factory('PrixSearch', PrixSearch);

    PrixSearch.$inject = ['$resource','API_URL'];

    function PrixSearch($resource,API_URL) {
        var resourceUrl =   API_URL+'api/_search/prixes/:id';
//        var resourceUrl =   'http://83.166.138.228:8080/api/_search/prixes/:id';
//        var resourceUrl =   'http://localhost:8080/api/_search/prixes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
