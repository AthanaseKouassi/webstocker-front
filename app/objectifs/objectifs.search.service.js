(function() {
    'use strict';

    angular
        .module('app')
        .factory('ObjectifsSearch', ObjectifsSearch);

    ObjectifsSearch.$inject = ['$resource','API_URL'];

    function ObjectifsSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/objectifs/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/objectifs/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/objectifs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
