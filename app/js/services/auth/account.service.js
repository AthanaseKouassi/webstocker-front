(function() {
    'use strict';

    angular
        .module('app')
        .factory('Account', Account);

    Account.$inject = ['$resource','API_URL'];

    function Account ($resource, API_URL) {
        var service = $resource( API_URL +'api/account', {}, {

            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
