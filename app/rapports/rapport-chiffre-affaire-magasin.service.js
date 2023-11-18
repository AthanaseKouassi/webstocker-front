(function() {
    'use strict';
    angular
        .module('app')
        .factory('ChiffreAffaireMagasin', ChiffreAffaireMagasin);

    ChiffreAffaireMagasin.$inject = ['$resource', 'DateUtils','API_URL'];

    function ChiffreAffaireMagasin ($resource, DateUtils,API_URL) {
        
        var resourceUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireparmagasin/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparmagasin/';
//        var resourceUrl = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparmagasin/';


        return $resource(resourceUrl, {}, {

            'imprimerChiffreAffaireParMagasin': {
                method: 'POST',
               responseType: 'arraybuffer'
            }
        });
    }
})();

