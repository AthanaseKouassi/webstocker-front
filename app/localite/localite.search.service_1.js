(function() {
    'use strict';

    angular
        .module('app')
        .factory('LocaliteSearch', LocaliteSearch);

    LocaliteSearch.$inject = ['$resource','API_URL'];

    function LocaliteSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/localites/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/localites/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/localites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
