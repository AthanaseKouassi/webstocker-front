(function() {
    'use strict';
    angular
        .module('app')
        .factory('ListeFactureService', ListeFactureService);

    ListeFactureService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ListeFactureService ($resource, DateUtils,API_URL) {
        
        var resourceUrl = API_URL+'api/report/etatdereconciliationmensuel';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/etatdereconciliationmensuel';
//        var resourceUrl = 'http://localhost:8080/api/report/etatdereconciliationmensuel';
        
        return $resource(resourceUrl, {}, {

            'imprimerCTL': {
                method: 'POST',
               responseType: 'arraybuffer'
            }
        });
    }
})();




