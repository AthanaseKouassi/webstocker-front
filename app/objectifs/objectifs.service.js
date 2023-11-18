(function() {
    'use strict';
    angular
        .module('app')
        .factory('Objectifs', Objectifs);

    Objectifs.$inject = ['$resource', 'DateUtils','API_URL'];

    function Objectifs ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/objectifs/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/objectifs/:id';
//        var resourceUrl =  'http://localhost:8080/api/objectifs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.periode = DateUtils.convertLocalDateFromServer(data.periode);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.periode = DateUtils.convertLocalDateToServer(data.periode);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.periode = DateUtils.convertLocalDateToServer(data.periode);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
