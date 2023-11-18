(function() {
    'use strict';
    angular
        .module('app')
        .factory('StockOperation', StockOperation);

    StockOperation.$inject = ['$resource','API_URL'];

    function StockOperation ($resource,API_URL) {
        var resourceUrl =  API_URL+'api/stockop/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'getQuantiteDispo': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getQuantiteDispoParMagasin': {
                method: 'GET',
                url: API_URL+'api/stockopm/:id/:magasinID',
                params:{
                    id:'@id',
                    magasinID: '@magasinID'
                },
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getPrixUnitaire': {
                method: 'GET',
//                url: API_URL+'api/stockop/prixclient/:idClient/:idProduit',
                url: API_URL+'api/stockop/prixclientvalide/:idClient/:idProduit',
                params:{
                    id:'@idClient',
                    quantite: '@idProduit'
                },
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getSortieWrapper': {
                url: API_URL+'api/stockop/:id/:quantite',
                method: 'GET',
                isArray: true,
                params:{
                    id:'@id',
                    quantite: '@quantite'
                },
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
