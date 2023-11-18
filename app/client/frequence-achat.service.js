(function() {
    'use strict';
    angular
        .module('app')
        .factory('FrequenceAchatService', FrequenceAchatService);

    FrequenceAchatService.$inject = ['$resource', 'DateUtils','API_URL'];

    function FrequenceAchatService ($resource, DateUtils, API_URL) {
        var resourceUrl = API_URL+'api/report/clients/frequenceAchat/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/report/clients/frequenceAchat/';
//        var resourceUrl = 'http://localhost:8080/api/report/clients/frequenceAchat/';

        console.log("url des ressources");
        console.log(resourceUrl);

        return $resource(resourceUrl, {}, {
            'imprimerFrequenceAchat': {  
                method: 'POST',
               responseType: 'arraybuffer'
           }
        });
    }
})();
