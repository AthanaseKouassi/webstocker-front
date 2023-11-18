(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportCommandeService', RapportCommandeService);

    RapportCommandeService.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportCommandeService ($resource, DateUtils, API_URL) {
        
        var resourceUrl = API_URL+'api/report/lignecommande/commande/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/lignecommande/commande/';
//        var resourceUrl = 'http://localhost:8080/api/report/lignecommande/commande/';

        return $resource(resourceUrl, {}, {

            'imprimerrapportCommande': {
                method: 'POST',
               responseType: 'arraybuffer'
            }
        });
    }
})();

