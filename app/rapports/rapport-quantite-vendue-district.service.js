(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportQuantiteVendueParDistrict', RapportQuantiteVendueParDistrict);

    RapportQuantiteVendueParDistrict.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportQuantiteVendueParDistrict ($resource, DateUtils,API_URL) {

        var resourceUrl = API_URL+'api/report/bondesortie/quantiteproduitvenduedansuneville/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/';
//        var resourceUrl = 'http://localhost:8080/api/report/bondesortie/quantiteproduitvenduedansuneville/';


        return $resource(resourceUrl, {}, {

            'imprimeRapport': {
                method: 'POST',
               responseType: 'arraybuffer'
            }
        });
    }
})();


