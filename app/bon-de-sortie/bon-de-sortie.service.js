(function() {
    'use strict';
    angular
        .module('app')
        .factory('BonDeSortie', BonDeSortie);

    BonDeSortie.$inject = ['$resource', 'DateUtils','API_URL'];

    function BonDeSortie ($resource, DateUtils, API_URL) {
        var resourceUrl =  API_URL+'api/bon-de-sorties/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},            
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.daateCreation = DateUtils.convertLocalDateFromServer(data.daateCreation);
                    
                    data.dateReception = DateUtils.convertLocalDateToServer(data.dateReception);

                    data.dateReceptionTransfert = DateUtils.convertLocalDateToServer(data.dateReceptionTransfert);

                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.daateCreation = DateUtils.convertLocalDateToServer(data.daateCreation);
                    
                    data.dateReception = DateUtils.convertLocalDateToServer(data.dateReception);

                    data.dateReceptionTransfert = DateUtils.convertLocalDateToServer(data.dateReceptionTransfert);

                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.daateCreation = DateUtils.convertLocalDateToServer(data.daateCreation);
                    data.dateReception = DateUtils.convertLocalDateToServer(data.dateReception);
                    data.dateReceptionTransfert = DateUtils.convertLocalDateToServer(data.dateReceptionTransfert);

                    return angular.toJson(data);
                }
            }
        });
    }
})();
