(function() {
    'use strict';

    angular
        .module('app')
        .factory('VilleSearch', VilleSearch);

    VilleSearch.$inject = ['$resource','API_URL'];

    function VilleSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/villes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/villes/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/villes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
