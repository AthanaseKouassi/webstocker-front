(function() {
    'use strict';
    angular
        .module('app')
        .factory('CommandesLivraison', CommandesLivraison);

    CommandesLivraison.$inject = ['$resource', 'DateUtils','API_URL'];

    function CommandesLivraison ($resource, DateUtils, API_URL) {

        console.log("dans commande fournisseur");
        var resourceUrl =  API_URL+'api/livraisonsCommande/';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/livraisonsCommande/';
//        var resourceUrl =  'http://localhost:8080/api/livraisonsCommande/';

        return $resource(resourceUrl, {}, {

            'saveUnLivraison': {
                method: 'POST',
                transformRequest: function (data) {
                    
                    return angular.toJson(data);
                }
            }
        });
    }
})();
