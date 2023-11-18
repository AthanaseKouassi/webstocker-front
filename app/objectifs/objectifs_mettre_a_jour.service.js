(function() {
    'use strict';

    angular
        .module('app')
        .factory('ObjectifsMAJ', ObjectifsMAJ);

    ObjectifsMAJ.$inject = ['$resource', 'DateUtils','API_URL'];

    function ObjectifsMAJ($resource, DateUtils, API_URL ) {
       
        var resourceUrl =  API_URL+'api/objectifs/objectifquantiteobtenue/:periode';
//        var resourceUrl =  'http://83.166.138.228:8080/api/objectifs/objectifquantiteobtenue/:periode';
//        var resourceUrl =  'http://localhost:8080/api/objectifs/objectifquantiteobtenue/:periode';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.periode = DateUtils.convertLocalDateFromServer(data.periode);
                    return data;
                }
            }
        });
    }
})();
