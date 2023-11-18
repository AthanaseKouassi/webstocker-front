(function() {
    'use strict';
    angular
        .module('app')
        .factory('Categorieclient', Categorieclient);

    Categorieclient.$inject = ['$resource','API_URL'];

    function Categorieclient ($resource,API_URL) {
        var resourceUrl = API_URL+'api/categorieclients/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/categorieclients/:id';
//        var resourceUrl =  'http://localhost:8080/api/categorieclients/:id';

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
