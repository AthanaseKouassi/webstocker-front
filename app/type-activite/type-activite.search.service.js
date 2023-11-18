(function() {
    'use strict';

    angular
        .module('app')
        .factory('TypeActiviteSearch', TypeActiviteSearch);

    TypeActiviteSearch.$inject = ['$resource','API_URL'];

    function TypeActiviteSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/type-activites/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/type-activites/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/type-activites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
