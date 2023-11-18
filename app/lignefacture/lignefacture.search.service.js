(function() {
    'use strict';

    angular
        .module('app')
        .factory('LignefactureSearch', LignefactureSearch);

    LignefactureSearch.$inject = ['$resource','API_URL'];

    function LignefactureSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/lignefactures/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/lignefactures/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/lignefactures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
