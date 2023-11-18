(function() {
    'use strict';

    angular
        .module('app')
        .factory('Password', Password);

    Password.$inject = ['$resource','API_URL'];

    function Password($resource,API_URL) {
        var service = $resource(API_URL+'api/account/change_password', {}, {});

        return service;
    }
})();
