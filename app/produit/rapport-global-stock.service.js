(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportGlobalService', RapportGlobalService);

    RapportGlobalService.$inject = ['$resource', 'DateUtils','API_URL'];
    
    function RapportGlobalService ($resource, Dateutils,API_URL){
        
        var $resourceUrl = API_URL+'api/report/etatstockglobal/etatstockglobalaimas/';
//        var $resourceUrl = 'http://83.166.138.228:8080/api/report/etatstockglobal/etatstockglobalaimas/';
//        var $resourceUrl = 'http://localhost:8080/api/report/etatstockglobal/etatstockglobalaimas/';
        
        return $resource($resourceUrl, {}, {
            
            'imprimeretatStockglobal': {               
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