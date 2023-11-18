(function() {
    'use strict';
    angular
        .module('app')
        .factory('ListeBordereauService', ListeBordereauService);

    ListeBordereauService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ListeBordereauService ($resource, DateUtils, API_URL) {
        
//        var resourceUrl = 'http://localhost:8080/api/report/lignelivraisons/bordereaulivraison/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/lignelivraisons/bordereaulivraison/';
        var resourceUrl = API_URL+'api/report/lignelivraisons/bordereaulivraison/';
        
        return $resource(resourceUrl, {}, {

            'imprimerBordereauLivraison': {
                method: 'GET',
               responseType: 'arraybuffer'
            }
        });
    }
})();




