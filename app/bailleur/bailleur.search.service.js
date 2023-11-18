(function() {
    'use strict';

    angular
        .module('app')
        .factory('BailleurSearch', BailleurSearch);

    BailleurSearch.$inject = ['$resource','API_URL'];

    function BailleurSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/bailleurs/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/bailleurs/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/bailleurs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
