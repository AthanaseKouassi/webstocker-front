(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommuneSearch', CommuneSearch);

    CommuneSearch.$inject = ['$resource','API_URL'];

    function CommuneSearch($resource, API_URL) {
        var resourceUrl =  API_URL+'api/_search/communes/:id';
//        var resourceUrl = 'http://83.166.138.228:8080/api/_search/communes/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/communes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
