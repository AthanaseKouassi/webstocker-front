(function() {
    'use strict';
    angular
        .module('app')
        .factory('Lignecommande', Lignecommande);

    Lignecommande.$inject = ['$resource', 'DateUtils','API_URL'];

    function Lignecommande ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/lignecommandes/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/lignecommandes/:id';
//        var resourceUrl =  'http://localhost:8080/api/lignecommandes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateFabrication = DateUtils.convertLocalDateFromServer(data.dateFabrication);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateFabrication = DateUtils.convertLocalDateToServer(data.dateFabrication);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateFabrication = DateUtils.convertLocalDateToServer(data.dateFabrication);
                    return angular.toJson(data);
                }
            },
            'getByCommande': {
//                url:'http://localhost:8080/api/lignecommandes/commande/:id',
//                url:'http://83.166.138.228:8080/api/lignecommandes/commande/:id',

                url: API_URL+'api/lignecommandes/commande/:id',
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateFabrication = DateUtils.convertLocalDateFromServer(data.dateFabrication);
                    return data;
                }
            }
            
        });
    }
})();
