(function() {
    'use strict';
    angular
        .module('app')
        .factory('Client', Client);

    Client.$inject = ['$resource','API_URL'];

    function Client ($resource, API_URL) {
        var resourceUrl = API_URL+'api/clients/:id';

        console.log("url des ressources");
        console.log(resourceUrl);

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
