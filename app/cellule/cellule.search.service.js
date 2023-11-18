(function() {
    'use strict';

    angular
        .module('app')
        .factory('CelluleSearch', CelluleSearch);

    CelluleSearch.$inject = ['$resource','API_URL'];

    function CelluleSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/cellules/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/cellules/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/cellules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
