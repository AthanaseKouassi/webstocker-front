(function() {
    'use strict';
    angular
        .module('app')
        .factory('TypeActivite', TypeActivite);

    TypeActivite.$inject = ['$resource','API_URL'];

    function TypeActivite ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/type-activites/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/type-activites/:id';
//        var resourceUrl =  'http://localhost:8080/api/type-activites/:id';

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
