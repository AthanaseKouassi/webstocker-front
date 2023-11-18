(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('audits', {
            parent: 'app',
            url: '/audits',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'audits.title'
            },
            views: {
                '@app': {
                    templateUrl: 'admin/audits/audits.html',
                    controller: 'AuditsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('audits');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
