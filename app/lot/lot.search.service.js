(function() {
    'use strict';

    angular
        .module('app')
        .factory('LotSearch', LotSearch);

    LotSearch.$inject = ['$resource','API_URL'];

    function LotSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/lots/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/lots/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/lots/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
