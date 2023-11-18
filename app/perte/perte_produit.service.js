(function() {
    'use strict';
    angular
        .module('app')
        .factory('PerteClient', PerteClient);

    PerteClient.$inject = ['$resource', 'DateUtils','API_URL'];

    function PerteClient ($resource, DateUtils,API_URL) {

        console.log("dans perteProduit");
        var resourceUrl =  API_URL+'api/perteProduit/';
//        var resourceUrl =  'http://83.166.138.228:8080/api/perteProduit/';
//        var resourceUrl =  'http://localhost:8080/api/perteProduit/';

        return $resource(resourceUrl, {}, {

            'savePerteClient': {
                method: 'POST',
                transformRequest: function (data) {
                    console.log(resourceUrl);
                    data.daateCreation = DateUtils.convertLocalDateToServer(data.daateCreation);
                    console.log(data);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
