(function () {
    'use strict';

    angular
            .module('app')
            .factory('ListeFacturesSearch', ListeFacturesSearch);

    ListeFacturesSearch.$inject = ['$resource', 'DateUtils','API_URL'];

    function ListeFacturesSearch($resource, DateUtils,API_URL) {

//        var resourceUrl =  'http://localhost:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/:dateDebut/:dateFin';
       
        var resourceUrl = API_URL+'api/ligne-bon-de-sorties/listedesfacturesparperiode/';
//        var resourceUrl = 'http://83.166.138.228:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/';
//        var resourceUrl = 'http://localhost:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/';

        return $resource(resourceUrl, {}, {
        'query': { method: 'GET', isArray: true},
       
//            'queryListeFacture': { 
//                url:'http://localhost:8080/api/ligne-bon-de-sorties/listedesfacturesparperiode/',
//                method: 'GET',
//                isArray: true
//                
//            },
            'get': { method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
//        'get': { method: 'GET',
//                transformResponse: function (data) {
//                    data = angular.fromJson(data);
//                    return data;
//                }
//            }
//            'afficherListe': { method: 'GET', isArray: true}           
                });
    }
})();