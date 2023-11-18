(function() {
    'use strict';
    angular
        .module('app')
        .factory('Localite', Localite);

    Localite.$inject = ['$resource','API_URL'];

    function Localite ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/localites/:id';
//        var resourceUrl =  'http://localhost:8080/api/localites/:id';

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
