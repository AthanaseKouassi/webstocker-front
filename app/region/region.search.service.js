(function() {
    'use strict';

    angular
        .module('app')
        .factory('RegionSearch', RegionSearch);

    RegionSearch.$inject = ['$resource','API_URL'];

    function RegionSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/regions/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/regions/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/regions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
