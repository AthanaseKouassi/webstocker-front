(function() {
    'use strict';
    angular
        .module('app')
        .factory('QteAgenceProduit', QteAgenceProduit);

    QteAgenceProduit.$inject = ['$resource', 'DateUtils','API_URL'];

    function QteAgenceProduit ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/livraisons/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/livraisons/:id';
//        var resourceUrl =  'http://localhost:8080/api/livraisons/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateLivraison = DateUtils.convertLocalDateFromServer(data.dateLivraison);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateLivraison = DateUtils.convertLocalDateToServer(data.dateLivraison);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateLivraison = DateUtils.convertLocalDateToServer(data.dateLivraison);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
