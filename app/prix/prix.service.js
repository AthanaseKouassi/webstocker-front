(function() {
    'use strict';
    angular
        .module('app')
        .factory('Prix', Prix);

    Prix.$inject = ['$resource','DateUtils','API_URL'];

   function Prix ($resource, DateUtils,API_URL) {
       var resourceUrl =  API_URL+'api/prixes/:id';
//       var resourceUrl =  'http://83.166.138.228:8080/api/prixes/:id';
//       var resourceUrl =  'http://localhost:8080/api/prixes/:id';
       
       return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateFixation = DateUtils.convertLocalDateFromServer(data.dateFixation);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateFixation = DateUtils.convertLocalDateToServer(data.dateFixation);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateFixation = DateUtils.convertLocalDateToServer(data.dateFixation);
                    return angular.toJson(data);
                }
            }  
        });
    }
})();
