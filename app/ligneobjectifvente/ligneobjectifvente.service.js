(function() {
    'use strict';
    angular
        .module('app')
        .factory('Ligneobjectifvente', Ligneobjectifvente);

    Ligneobjectifvente.$inject = ['$resource','API_URL'];

    function Ligneobjectifvente ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/ligneobjectifventes/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/ligneobjectifventes/:id';
//        var resourceUrl =  'http://localhost:8080/api/ligneobjectifventes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
