(function() {
    'use strict';
    angular
        .module('app')
        .factory('ListeClientCategorieService', ListeClientCategorieService);

    ListeClientCategorieService.$inject = ['$resource','API_URL'];

    function ListeClientCategorieService ($resource,API_URL) {
        var resourceUrl = API_URL+'api/report/clients/liste';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/clients/liste';
//        var resourceUrl = 'http://localhost:8080/api/report/clients/liste';
        console.log("url des ressources");
        console.log(resourceUrl);

        return $resource(resourceUrl, {}, {
            'imprimerListeDesClientParCategorie': {  
                method: 'GET',
               responseType: 'arraybuffer'
           }
        });
    }
})();
