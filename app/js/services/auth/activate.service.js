(function() {
    'use strict';

    angular
        .module('app')
        .factory('Activate', Activate);

    Activate.$inject = ['$resource','API_URL'];

    function Activate ($resource,API_URL) {

        var service = $resource(API_URL+'api/activate', {}, {
            'get': { method: 'GET', params: {}, isArray: false}
        });

        return service;
    }
})();
