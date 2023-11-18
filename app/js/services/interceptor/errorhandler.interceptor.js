(function() {
    'use strict';

    angular
        .module('app')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope', 'API_URL'];

    function errorHandlerInterceptor ($q, $rootScope, API_URL) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError (response) {
            if (!(response.status === 401 && (response.data === '' || response.data.path.indexOf(API_URL+'api/account') === 0 ))) {
                
//            if (!(response.status === 401 && (response.data === '' || response.data.path.indexOf('http://83.166.138.228:8080/api/account') === 0 ))) {
//            if (!(response.status === 401 && (response.data === '' || response.data.path.indexOf('http://localhost:8080/api/account') === 0 ))) {
                $rootScope.$emit('webstockerApp.httpError', response);
            }
            return $q.reject(response);
        }
    }
})();
