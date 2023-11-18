(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportGlobalBailleurService', RapportGlobalBailleurService);

    RapportGlobalBailleurService.$inject = ['$resource', 'DateUtils','API_URL'];

    function RapportGlobalBailleurService ($resource, DateUtils,API_URL){
        
        var $resourceUrl = API_URL+'api/report/etatstockglobal/etatstockglobalbailleur/';
//        var $resourceUrl = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalbailleur/';
//        var $resourceUrl = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalbailleur/';
        
        return $resource($resourceUrl, {}, {
            
            'imprimerEtatStockGlobalBailleur': {               
                method: 'GET',                
                headers: {
                    accept: 'application/pdf'
                },
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data) {
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf
                    };
                }
            }
        });
    }

});
