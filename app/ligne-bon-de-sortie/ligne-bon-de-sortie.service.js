(function() {
    'use strict';
    angular
        .module('app')
        .factory('LigneBonDeSortie', LigneBonDeSortie);

    LigneBonDeSortie.$inject = ['$resource','API_URL'];

    function LigneBonDeSortie ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/ligne-bon-de-sorties/:id';

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
