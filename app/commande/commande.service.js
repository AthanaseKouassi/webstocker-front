(function() {
    'use strict';
    angular
        .module('app')
        .factory('Commande', Commande);

    Commande.$inject = ['$resource', 'DateUtils', 'API_URL'];

    function Commande ($resource, DateUtils, API_URL) {
        var resourceUrl =  API_URL+'api/commandes/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/commandes/:id';
//        var resourceUrl =  'http://localhost:8080/api/commandes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'queryCommandeEnCours': {
                url: API_URL+'api/_search/commandes/active?query=LIVREE',
//                url:'http://83.166.138.228:8080/api/_search/commandes/active?query=LIVREE',
//                url:'http://localhost:8080/api/_search/commandes/active?query=LIVREE',
                method: 'GET',
                isArray: true
            },'queryQuantiteRestanteAlivrer': {
                url: API_URL+'api/commandes/livraison/restant?id=:id',
//                url:'http://83.166.138.228:8080/api/commandes/livraison/restant?id=:id',
//                url:'http://localhost:8080/api/commandes/livraison/restant?id=:id',
                method: 'GET',
                
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateCommande = DateUtils.convertLocalDateFromServer(data.dateCommande);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateCommande = DateUtils.convertLocalDateToServer(data.dateCommande);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    console.log(resourceUrl);
                    data.dateCommande = DateUtils.convertLocalDateToServer(data.dateCommande);
                    console.log(data);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
