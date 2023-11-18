(function() {
    'use strict';
    angular
        .module('app')
        .factory('ObjectifsTauxAmettreAjourService', ObjectifsTauxAmettreAjourService);

    ObjectifsTauxAmettreAjourService.$inject = ['$resource', 'DateUtils','API_URL'];

    function ObjectifsTauxAmettreAjourService ($resource, DateUtils,API_URL) {
        var resourceUrl =  API_URL+'api/objectifs/misajourquantiteobtenueettaux';
//        var resourceUrl =  'http://83.166.138.228:8080/api/objectifs/misajourquantiteobtenueettaux';
//        var resourceUrl =  'http://localhost:8080/api/objectifs/misajourquantiteobtenueettaux';
        
        return $resource(resourceUrl, {}, {
            
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.periode = DateUtils.convertLocalDateToServer(data.periode);
                    return angular.toJson(data);
                }
            }
            
        });
    }
})();
