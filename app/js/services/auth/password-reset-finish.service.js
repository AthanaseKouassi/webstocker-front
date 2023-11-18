(function() {
    'use strict';

    angular
        .module('app')
        .factory('PasswordResetFinish', PasswordResetFinish);

    PasswordResetFinish.$inject = ['$resource','API_URL'];

    function PasswordResetFinish($resource,API_URL) {

        var service = $resource(API_URL+'api/account/reset_password/finish', {}, {});

        return service;
    }
})();
