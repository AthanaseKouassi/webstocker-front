(function() {
    'use strict';
    angular
        .module('app')
        .factory('ListeBonDeSortieService', ListeBonDeSortieService);

    ListeBonDeSortieService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ListeBonDeSortieService ($resource, DateUtils,API_URL) {        

        var resourceUrl = API_URL+'api/report/bondesorties/toutbondesortie/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/bondesorties/toutbondesortie/';
//        var resourceUrl = 'http://localhost:8080/api/report/bondesorties/toutbondesortie/';
        
        return $resource(resourceUrl, {}, {

            'imprimerBondeSortie': {
                method: 'GET',
               responseType: 'arraybuffer'
            }
        });
    }
})();




