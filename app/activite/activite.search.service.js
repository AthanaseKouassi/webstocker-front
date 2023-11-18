(function() {
    'use strict';

    angular
        .module('app')
        .factory('ActiviteSearch', ActiviteSearch);

    ActiviteSearch.$inject = ['$resource','API_URL'];

    function ActiviteSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/activites/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/activites/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/activites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
