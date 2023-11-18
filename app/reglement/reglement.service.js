/**
 * Created by centonni on 27/01/17.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('Reglement', Reglement);

    Reglement.$inject = ['$resource', 'DateUtils','API_URL'];

    function Reglement ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/reglements/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateReglement = DateUtils.convertLocalDateFromServer(data.dateReglement);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateReglement = DateUtils.convertLocalDateToServer(data.dateReglement);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    console.log("into save");
                    console.log(data);
                    data.dateReglement = DateUtils.convertLocalDateToServer(data.dateReglement);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
