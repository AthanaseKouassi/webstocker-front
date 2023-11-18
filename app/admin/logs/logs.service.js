(function() {
    'use strict';

    angular
        .module('app')
        .factory('LogsService', LogsService);

    LogsService.$inject = ['$resource','API_URL'];

    function LogsService ($resource,API_URL) {
        var service = $resource(API_URL+'api/logs', {}, {
//        var service = $resource('http://83.166.138.228:8080/api/logs', {}, {
//        var service = $resource('http://localhost:8080/api/logs', {}, {
            'findAll': { method: 'GET', isArray: true},
            'changeLevel': { method: 'PUT'}
        });

        return service;
    }
})();
