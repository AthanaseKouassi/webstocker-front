(function () {
    'use strict';

    angular
        .module('app')
        .factory('User', User);

    User.$inject = ['$resource','API_URL'];

    function User ($resource,API_URL) {
        var service = $resource(API_URL+'api/users/:login', {}, {
            
//        var service = $resource('http://83.166.138.228:8080/api/users/:login', {}, {
//        var service = $resource('http://localhost:8080/api/users/:login', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }
})();
