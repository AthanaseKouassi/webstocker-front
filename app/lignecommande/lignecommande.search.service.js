(function() {
    'use strict';

    angular
        .module('app')
        .factory('LignecommandeSearch', LignecommandeSearch);

    LignecommandeSearch.$inject = ['$resource','API_URL'];

    function LignecommandeSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/lignecommandes/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/lignecommandes/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/lignecommandes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
