(function() {
    'use strict';

    angular
        .module('app')
        .factory('ConditionnementSearch', ConditionnementSearch);

    ConditionnementSearch.$inject = ['$resource','API_URL'];

    function ConditionnementSearch($resource, API_URL) {
        var resourceUrl =  API_URL+'api/_search/conditionnements/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/_search/conditionnements/:id';
//        var resourceUrl =  'http://localhost:8080/api/_search/conditionnements/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
