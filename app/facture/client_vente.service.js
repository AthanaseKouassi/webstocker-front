(function () {
    'use strict';
    angular
            .module('app')
            .factory('VenteClient', VenteClient);

    VenteClient.$inject = ['$resource', 'DateUtils','API_URL'];

    function VenteClient($resource, DateUtils, API_URL) {

        console.log("dans venteClient");
        var resourceUrl = API_URL+'api/venteClient/';
        
//        var resourceUrl = 'http://83.166.138.228:8080/api/venteClient/';
//        var resourceUrl = 'http://localhost:8080/api/venteClient/';

        return $resource(resourceUrl, {}, {
            'saveVenteClient': {
                method: 'POST',
                transformRequest: function (data) {
                    console.log(resourceUrl);
                    data.daateCreation = DateUtils.convertLocalDateToServer(data.daateCreation);
                    console.log(data);
                    return angular.toJson(data);
                }
            }
            ,
            'getFacture': {
//                url: 'http://localhost:8080/api/report/lignesfactures/facture',
//                url: 'http://83.166.138.228:8080/api/report/lignesfactures/facture',
//                
                url:  API_URL+'api/report/lignesfactures/facture',
                method: 'GET',
                headers: {
                    accept: 'application/pdf'
                },
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data) {
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf
                    };
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
