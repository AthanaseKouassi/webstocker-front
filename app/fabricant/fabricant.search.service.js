(function() {
    'use strict';

    angular
        .module('app')
        .factory('FabricantSearch', FabricantSearch);

    FabricantSearch.$inject = ['$resource','API_URL'];

    function FabricantSearch($resource, API_URL) {
        var resourceUrl =  API_URL+'api/_search/fabricants/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/fabricants/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/fabricants/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
