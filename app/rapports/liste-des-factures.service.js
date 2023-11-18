(function() {
    'use strict';
    angular
        .module('app')
        .factory('ListeFactureService', ListeFactureService);

    ListeFactureService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ListeFactureService ($resource, DateUtils,API_URL) {
        
        var resourceUrl =  API_URL+'api/report/rapportdesventes/listedesfacturesparperiode/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/rapportdesventes/listedesfacturesparperiode/';
//        var resourceUrl = 'http://localhost:8080/api/report/rapportdesventes/listedesfacturesparperiode/';

        return $resource(resourceUrl, {}, {

            'imprimerListeFactures': {
                method: 'POST',
               responseType: 'arraybuffer'
            },
             'queryListeFac': { 
                
                method: 'GET',
                isArray: true
                
            }
        });
    }
})();




