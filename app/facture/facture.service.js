(function() {
    'use strict';
    angular
        .module('app')
        .factory('Facture', Facture);

    Facture.$inject = ['$resource', 'DateUtils','API_URL'];

    function Facture ($resource, DateUtils, API_URL) {
        var resourceUrl =  API_URL+'api/factures/:id';
        
        console.log("url des ressources Facture");
        console.log(resourceUrl);
//        var resourceUrl =  'http://83.166.138.228:8080/api/factures/:id';
//        var resourceUrl =  'http://localhost:8080/api/factures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateFacture = DateUtils.convertLocalDateFromServer(data.dateFacture);
                    return data;
                }
            },
            'getAllFacturesCustom': {
                method: 'GET',
                isArray: true,
                url: API_URL+'api/factures-all'
                // transformResponse: function (data) {
                //     data = angular.fromJson(data);
                //     data.date = DateUtils.convertLocalDateFromServer(data.date);
                //     return data;
                // }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateFacture = DateUtils.convertLocalDateToServer(data.dateFacture);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateFacture = DateUtils.convertLocalDateToServer(data.dateFacture);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
