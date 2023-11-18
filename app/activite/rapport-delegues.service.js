(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportDelegueService', RapportDelegueService);

    RapportDelegueService.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportDelegueService ($resource, DateUtils,API_URL) {
        
        var resourceUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireparclient/';
       // var resourceUrl = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparclient/';
        
        
//        var resourceUrl = 'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparclient/';

        return $resource(resourceUrl, {}, {

            'imprimerChiffreAffaireParClient': {
                method: 'POST',
               responseType: 'arraybuffer'
            }
        });
    }
})();




