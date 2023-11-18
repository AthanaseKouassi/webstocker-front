(function() {
    'use strict';
    angular
        .module('app')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['$resource','API_URL'];

    function NotificationService ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/bon-de-sorties';
//        var resourceUrl =  'http://83.166.138.228:8080/api/bon-de-sorties';
//        var resourceUrl =  'http://localhost:8080/api/bon-de-sorties';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'queryBonSortie': {
                url: API_URL+'api/bon-de-sorties',
//                url:'http://83.166.138.228:8080/api/bon-de-sorties',
//                url:'http://localhost:8080/api/bon-de-sorties',
                method: 'GET',
                isArray: true
            },
            'queryFacture': {
                url: API_URL+'api/factures',
//                url:' http://83.166.138.228:8080/api/factures',
//                url:' http://localhost:8080/api/factures',
                method: 'GET',
                isArray: true
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }
})();
