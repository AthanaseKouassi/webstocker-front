(function() {
    'use strict';
    angular
        .module('app')
        .factory('CommandeFournisseur', CommandeFournisseur);

    CommandeFournisseur.$inject = ['$resource', 'DateUtils','API_URL'];

    function CommandeFournisseur ($resource, DateUtils, API_URL) {

        console.log("dans commande fournisseur");
        var resourceUrl =  API_URL+'api/commandesFournisseur/';
//        var resourceUrl =  'http://83.166.138.228:8080/api/commandesFournisseur/';
//        var resourceUrl =  'http://localhost:8080/api/commandesFournisseur/';

        return $resource(resourceUrl, {}, {

            'saveUnFournisseur': {
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
