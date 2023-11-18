(function() {
    'use strict';

    angular
        .module('app')
        .factory('MissionSearch', MissionSearch);

    MissionSearch.$inject = ['$resource','API_URL'];

    function MissionSearch($resource,API_URL) {
        var resourceUrl =  API_URL+'api/_search/missions/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/missions/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/missions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
