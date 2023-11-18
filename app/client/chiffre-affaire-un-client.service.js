(function() {
    'use strict';
    angular
        .module('app')
        .factory('ChiffreAffaireUnClientservice', ChiffreAffaireUnClientservice);

    ChiffreAffaireUnClientservice.$inject = ['$resource', 'DateUtils','API_URL'];

    function ChiffreAffaireUnClientservice ($resource, DateUtils,API_URL) {
        var resourceUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireunclient/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireunclient/';
//        var resourceUrl = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireunclient/';

        console.log("url des ressources");
        console.log(resourceUrl);

        return $resource(resourceUrl, {}, {
            'imprimerChiffreAffaireUnclient': {  
                method: 'POST',
               responseType: 'arraybuffer'
           }
        });
    }
})();
