(function() {
    'use strict';
    angular
        .module('app')
        .factory('RapportTauxAtteinteObjectif', RapportTauxAtteinteObjectif);

    RapportTauxAtteinteObjectif.$inject = ['$resource', 'DateUtils','API_URL'];
    
    function RapportTauxAtteinteObjectif ($resource, Dateutils,API_URL){
        
        var $resourceUrl = API_URL+'api/report/objectifs/tauxatteinteobjectifsparmois/';
//        var $resourceUrl = 'http://83.166.138.228:8080/api/report/objectifs/tauxatteinteobjectifsparmois/';
//        var $resourceUrl = 'http://localhost:8080/api/report/objectifs/tauxatteinteobjectifsparmois/';
        
        return $resource($resourceUrl, {}, {
            
            'imprimerTauxAtteinteObjectif': {               
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