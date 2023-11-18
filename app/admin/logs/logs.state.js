(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('logs', {
            parent: 'app',
            url: '/logs',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'logs.title'
            },
            views: {
                '@app': {
                    templateUrl: 'admin/logs/logs.html',
                    controller: 'LogsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('logs');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
