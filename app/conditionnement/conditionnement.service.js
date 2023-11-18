(function() {
    'use strict';
    angular
        .module('app')
        .factory('Conditionnement', Conditionnement);

    Conditionnement.$inject = ['$resource','API_URL'];

    function Conditionnement ($resource, API_URL) {
        var resourceUrl = API_URL+ 'api/conditionnements/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/conditionnements/:id';
//        var resourceUrl =  'http://localhost:8080/api/conditionnements/:id';

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
