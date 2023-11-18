(function() {
    'use strict';
    angular
        .module('app')
        .factory('TransfertClient', TransfertClient);

    TransfertClient.$inject = ['$resource', 'DateUtils','API_URL'];

    function TransfertClient ($resource, DateUtils,API_URL) {

        console.log("dans venteClient");
        var resourceUrl =  API_URL+'api/transfertProduit/';

        return $resource(resourceUrl, {}, {

            'saveTransfertClient': {
                method: 'POST',
                transformRequest: function (data) {
                    console.log(resourceUrl);
                    data.daateCreation = DateUtils.convertLocalDateToServer(data.daateCreation);
                    console.log(data);
                    return angular.toJson(data);
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
