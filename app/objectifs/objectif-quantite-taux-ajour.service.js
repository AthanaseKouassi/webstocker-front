(function() {
    'use strict';

    angular
        .module('app')
        .factory('ObjectifsQuantiteEtTauxAjour', ObjectifsQuantiteEtTauxAjour);

    ObjectifsQuantiteEtTauxAjour.$inject = ['$resource', 'DateUtils','API_URL'];

    function ObjectifsQuantiteEtTauxAjour($resource, DateUtils, API_URL ) {
       
//        var resourceUrl =  'http://localhost:8080/api/objectifs/objectifs_mettre_a_jour';
//        var resourceUrl =  'http://83.166.138.228:8080/api/objectifs/objectifs_mettre_a_jour';
        var resourceUrl =  API_URL+'api/objectifs/objectifs_mettre_a_jour';

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
