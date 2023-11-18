(function() {
    'use strict';

    angular
        .module('app')
        .factory('InventaireSearch', InventaireSearch);

    InventaireSearch.$inject = ['$resource','API_URL'];

    function InventaireSearch($resource,API_URL) {
        var resourceUrl = API_URL+ 'api/_search/inventaires/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
