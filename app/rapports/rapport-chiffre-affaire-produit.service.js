(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportChiffreAffaireProduit', RapportChiffreAffaireProduit);

    RapportChiffreAffaireProduit.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportChiffreAffaireProduit ($resource, DateUtils,API_URL) {
        
        var resourceUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireparproduit/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';
//        var resourceUrl = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';

        return $resource(resourceUrl, {}, {

            'imprimerChiffreAffaireParProduit': {
                method: 'GET',
               responseType: 'arraybuffer'
            }
        });
    }
})();




