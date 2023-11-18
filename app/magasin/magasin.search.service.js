(function() {
    'use strict';

    angular
        .module('app')
        .factory('MagasinSearch', MagasinSearch);

    MagasinSearch.$inject = ['$resource','API_URL'];

    function MagasinSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/magasins/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/magasins/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/magasins/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
