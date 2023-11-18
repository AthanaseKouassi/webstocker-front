(function() {
    'use strict';
    angular
        .module('app')
        .factory('ObjectifsTauxMAJ', ObjectifsTauxMAJ);

    ObjectifsTauxMAJ.$inject = ['$resource', 'DateUtils','API_URL'];

    function ObjectifsTauxMAJ ($resource, DateUtils, API_URL) {
        var resourceUrl =  API_URL+'api/objectifs/objectifsquantiteobtenumisajour/:id';
//        var resourceUrl =  'http://83.166.138.228:8080/api/objectifs/objectifsquantiteobtenumisajour/:id';
//        var resourceUrl =  'http://localhost:8080/api/objectifs/objectifsquantiteobtenumisajour/:id';
        
        return $resource(resourceUrl, {}, {
            
            'get': {
                method: 'GET',
                transformRequest: function (data) {
//                    data.periode = DateUtils.convertLocalDateToServer(data.periode);
                    return angular.toJson(data);
                }
            }
            
        });
    }
})();
