(function () {
    'use strict';
    angular
            .module('app')
            .factory('RapportStock', RapportStock);

    RapportStock.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportStock($resource, DateUtils, API_URL) {

        console.log("dans venteClient");
//        var resourceUrl = 'http://localhost:8080/api/report/lignebondesorties/quantitevenduparmagasin/';

         var resourceUrl=  API_URL+'api/report/lignebondesorties/quantitelotproduitvenduparmagasin/';
         
//         var resourceUrl= 'http://83.166.138.228:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/';
//         var resourceUrl= 'http://localhost:8080/api/report/lignebondesorties/quantitelotproduitvenduparmagasin/';
        return $resource(resourceUrl, {}, {
            'etatQuantiteVendueParMagasin': {
                method: 'POST',
                responseType: 'arraybuffer'
            }
        });
    }
})();
