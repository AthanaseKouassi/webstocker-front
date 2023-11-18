(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommandeSearch', CommandeSearch);

    CommandeSearch.$inject = ['$resource','API_URL'];

    function CommandeSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/commandes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/commandes/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/commandes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
