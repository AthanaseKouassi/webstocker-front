(function() {
    'use strict';
    angular
        .module('app')
        .factory('LigneMissionActivite', LigneMissionActivite);

    LigneMissionActivite.$inject = ['$resource', 'DateUtils','API_URL'];

    function LigneMissionActivite ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/ligne-mission-activites/:id';
        
//        var resourceUrl =  'http://83.166.138.228:8080/api/ligne-mission-activites/:id';
//        var resourceUrl =  'http://localhost:8080/api/ligne-mission-activites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateResultat = DateUtils.convertLocalDateFromServer(data.dateResultat);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateResultat = DateUtils.convertLocalDateToServer(data.dateResultat);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateResultat = DateUtils.convertLocalDateToServer(data.dateResultat);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
