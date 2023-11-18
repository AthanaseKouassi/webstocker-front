(function() {
    'use strict';
    angular
        .module('app')
        .factory('ObjectifsQuantieObtenue', ObjectifsQuantieObtenue);

    ObjectifsQuantieObtenue.$inject = ['$resource', 'DateUtils','API_URL'];

    function ObjectifsQuantieObtenue ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/ligne-bon-de-sorties/sommequantitevendueparmois/';
//        var resourceUrl =  'http://83.166.138.228:8080/api/ligne-bon-de-sorties/sommequantitevendueparmois/';
//        var resourceUrl =  'http://localhost:8080/api/ligne-bon-de-sorties/sommequantitevendueparmois/';
                
        return $resource(resourceUrl, {}, {            
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.periode = DateUtils.convertLocalDateFromServer(data.periode);
                    return data;
                }
            }
            
        });
    }
})();
