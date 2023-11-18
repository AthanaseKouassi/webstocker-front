(function() {
    'use strict';

    angular
        .module('app')
        .factory('LigneMissionActiviteSearch', LigneMissionActiviteSearch);

    LigneMissionActiviteSearch.$inject = ['$resource','API_URL'];

    function LigneMissionActiviteSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/ligne-mission-activites/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/ligne-mission-activites/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/ligne-mission-activites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
