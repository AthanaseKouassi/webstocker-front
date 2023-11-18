(function() {
    'use strict';

    angular
        .module('app')
        .factory('PasswordResetInit', PasswordResetInit);

    PasswordResetInit.$inject = ['$resource','API_URL'];

    function PasswordResetInit($resource,API_URL) {
        var service = $resource(API_URL+'api/account/reset_password/init', {}, {});

        return service;
    }
})();
