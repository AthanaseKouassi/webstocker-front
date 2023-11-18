(function() {
    'use strict';
    angular
        .module('app')
        .factory('PromotionClient', PromotionClient);

    PromotionClient.$inject = ['$resource', 'DateUtils','API_URL'];

    function PromotionClient ($resource, DateUtils,API_URL) {

        console.log("dans venteClient");
        var resourceUrl =  API_URL+'api/promotionProduit/';

        return $resource(resourceUrl, {}, {

            'savePromotionClient': {
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
