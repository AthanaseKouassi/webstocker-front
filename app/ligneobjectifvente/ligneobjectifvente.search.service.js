(function() {
    'use strict';

    angular
        .module('app')
        .factory('LigneobjectifventeSearch', LigneobjectifventeSearch);

    LigneobjectifventeSearch.$inject = ['$resource','API_URL'];

    function LigneobjectifventeSearch($resource,API_URL) {
//        var resourceUrl =  'http://localhost:8080/api/_search/ligneobjectifventes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/ligneobjectifventes/:id';

        var resourceUrl =  API_URL+'api/_search/ligneobjectifventes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
