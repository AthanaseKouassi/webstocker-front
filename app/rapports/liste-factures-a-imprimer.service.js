(function() {
    'use strict';

    angular
        .module('app')
        .factory('FactureAImprimerService', FactureAImprimerService);

    FactureAImprimerService.$inject = ['$resource', 'DateUtils','API_URL'];

    function FactureAImprimerService($resource, DateUtils, API_URL ) {
       
        var resourceUrl =  API_URL+'api/ligne-bon-de-sorties/listedesfacturesparperiode/:dateDebut/:dateFin';
//        var resourceUrl =  'http://83.166.138.228:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/:dateDebut/:dateFin';
//        var resourceUrl =  'http://localhost:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/:dateDebut/:dateFin';
        

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    //data.periode = DateUtils.convertLocalDateFromServer(data.periode);
                    return data;
                }
            }
        });
    }
})();
