(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuditsService', AuditsService);

    AuditsService.$inject = ['$resource','API_URL'];

    function AuditsService ($resource,API_URL) {
        var service = $resource(API_URL+'api/audits/:id', {}, {
//        var service = $resource('http://83.166.138.228:8080/api/audits/:id', {}, {
//        var service = $resource('http://localhost:8080/api/audits/:id', {}, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'query': {
                method: 'GET',
                isArray: true,
                params: {fromDate: null, toDate: null}
            }
        });

        return service;
    }
})();
