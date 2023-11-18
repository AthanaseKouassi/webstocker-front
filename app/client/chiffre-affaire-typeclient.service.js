(function() {
    'use strict';
    angular
        .module('app')
        .factory('ChiffreAffaireCategorieClientService', ChiffreAffaireCategorieClientService);

    ChiffreAffaireCategorieClientService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ChiffreAffaireCategorieClientService ($resource, DateUtils,API_URL) {
//        var resourceUrl = 'http://localhost:8080/api/report/clients/chiffreaffairetypeclient/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/clients/chiffreaffairetypeclient/';
        var resourceUrl = API_URL+'api/report/clients/chiffreaffairetypeclient/';

        console.log("url des ressources");
        console.log(resourceUrl);

        return $resource(resourceUrl, {}, {
            'imprimerChiffreAffaireTypeClient': {  
                method: 'POST',
               responseType: 'arraybuffer'
           }
        });
    }
})();
