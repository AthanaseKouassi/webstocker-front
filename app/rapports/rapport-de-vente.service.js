(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportVenteService', RapportVenteService);

    RapportVenteService.$inject = ['$resource', 'DateUtils','API_URL'];
    
    function RapportVenteService ($resource, Dateutils,API_URL){
        var $resourceUrl = API_URL+'api/report/lignebondesorties/chiffreaffaireparproduit/';
//        var $resourceUrl ='http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';
//        var $resourceUrl ='http://localhost:8080/api/report/lignebondesorties/chiffreaffaireparproduit/';
        
        return $resource($resourceUrl, {}, {
            'chiffreAffaireProduit': {               
                method: 'POST',
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