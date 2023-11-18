(function() {
    'use strict';

    angular
        .module('app')
        .factory('BonDeSortieSearch', BonDeSortieSearch);

    BonDeSortieSearch.$inject = ['$resource','API_URL'];

    function BonDeSortieSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/bon-de-sorties/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/bon-de-sorties/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/bon-de-sorties/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
